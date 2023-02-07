const express = require("express");
const router = express.Router();
const DivisionModel = require("../db/division.model");

router.use("/:id", async (req, res, next) => {
  let division = null;

  try {
    division = await DivisionModel.findById(req.params.id).populate([
      "employees",
      "boss",
    ]);
  } catch (err) {
    return next(err);
  }

  if (!division) {
    return res.status(404).end("Division not found");
  }

  req.division = division;
  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const divisions = await DivisionModel.find().populate([
      "employees",
      "boss",
    ]);
    return res.json(divisions);
  })
  .post(async (req, res, next) => {
    const division = req.body;

    try {
      const saved = await DivisionModel.create(division);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    return res.json(req.division);
  })
  .patch(async (req, res, next) => {
    const division = req.body;
    try {
      const updated = await req.division.set(division).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleted = await req.division.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
