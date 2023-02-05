/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const booleans = require("./booleans.json");
const eqnames = require("./eqnames.json");
const eqtypes = require("./eqtypes.json");
const dates = require("./dates.json");
const colors = require("./colors.json");
const division = require("./division_names.json");
const cities = require("./cities.json");

const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const DivisionModel = require("../db/division.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

async function findEmployeesDivision() {
  let allEmployees = await EmployeeModel.find();
  let allDivisions = await DivisionModel.find();
  const mainArr = [];
  for (let i = 0; i < allDivisions.length; i++) {
    let arr = [];
    for (let j = 0; j < allEmployees.length; j++) {
      if (
        allDivisions[i]._id.toString() === allEmployees[j].division.toString()
      ) {
        arr.push({ _id: allEmployees[j]._id.toString() });
      }
    }
    mainArr.push(arr);
  }

  return mainArr;
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const randomSalary = () => Math.floor(Math.random() * (60 - 20 + 1) + 20);

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  let divisions = await DivisionModel.find();
  const employees = names.map((name) => {
    let randomSalaryNum = randomSalary();
    return {
      name,
      level: pick(levels),
      position: pick(positions),
      present: pick(booleans),
      equipment: "",
      starting_date: pick(dates),
      current_salary: randomSalaryNum,
      favourite_color: pick(colors),
      desired_salary: randomSalaryNum + 10 <= 60 ? randomSalaryNum + 10 : 60,
      division: pick(divisions)._id,
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});
  const equipments = eqnames.map((Eq_name) => ({
    Eq_name,
    Eq_type: pick(eqtypes),
    Eq_amount: Math.floor(Math.random() * (10 - 0)),
  }));
  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const populateDivision = async (EmployeeIds) => {
  await DivisionModel.deleteMany({});
  let boss = await EmployeeModel.find({ position: "Director" });
  const divisions = division.map((name, index) => {
    return {
      name,
      boss: pick(boss)._id,
      budget: randomSalary(),
      location: {
        city: pick(cities),
        country: "Hungary",
      },
      employees: [...EmployeeIds[index]],
    };
  });

  await DivisionModel.create(...divisions);
  console.log("Divisions created");
};
const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateDivision(await findEmployeesDivision());
  await populateEmployees();
  await populateEquipment();
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
