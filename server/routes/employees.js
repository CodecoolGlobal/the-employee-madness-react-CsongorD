const express = require("express");
const DivisionModel = require("../db/division.model");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");

router.use("/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id).populate("kittens");
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const employees = await EmployeeModel.find().populate([
      "division",
      "kittens",
      "board_game",
    ]);

    return res.json(employees);
  })
  .post(async (req, res, next) => {
    const employee = req.body;
    try {
      const saved = await EmployeeModel.create(employee);
      await DivisionModel.findOneAndUpdate(
        { _id: saved.division },
        { $push: { employees: saved._id } }
      );
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    return res.json(req.employee);
  })
  .patch(async (req, res, next) => {
    const employee = req.body;

    try {
      const updated = await req.employee.set(employee).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleted = await req.employee.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
