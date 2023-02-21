const express = require("express");
const router = express.Router();
const CompanyModel = require("../db/company.model");

router.use("/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await CompanyModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

router.get("/", async (req, res) => {
  const employees = await CompanyModel.find().sort({ created: "desc" });
  return res.json(employees);
});

router.get("/:id", (req, res) => {
  return res.json(req.employee);
});

router.post("/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await CompanyModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
