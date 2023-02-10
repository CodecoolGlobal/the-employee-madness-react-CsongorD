const express = require("express");
const router = express.Router();
const KittenModel = require("../db/kitten.model");
const EmployeeModel = require("../db/employee.model");
router.use("/:id", async (req, res, next) => {
  let kitten = null;

  try {
    kitten = await KittenModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }
  if (!kitten) {
    return res.status(404).end("Kitten not found");
  }

  req.kitten = kitten;

  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const kittens = await KittenModel.find();
    return res.json(kittens);
  })
  .post(async (req, res, next) => {
    const kitten = req.body;
    try {
      const saved = await KittenModel.create(kitten);
      console.log(saved);
      await EmployeeModel.findOneAndUpdate(
        { _id: saved.employee },
        { $push: { kittens: saved._id } }
      );
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    return res.json(req.kitten);
  })
  .patch(async (req, res, next) => {
    const kitten = req.body;

    try {
      const updated = await req.kitten.set(kitten).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleted = await req.kitten.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
