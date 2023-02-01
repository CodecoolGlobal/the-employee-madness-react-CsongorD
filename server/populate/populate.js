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

const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const randomSalary = () => Math.floor(Math.random() * (60 - 20 + 1) + 20);

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
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

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateEquipment();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
