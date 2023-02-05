const express = require("express");
const router = express.Router();

const ToolModel = require("../db/tool.model");

router.use("/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await ToolModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }
  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;

  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const equipments = await ToolModel.find().sort({ created: "desc" }).lean();
    return res.json(equipments);
  })
  .post(async (req, res, next) => {
    const equipment = req.body;

    try {
      const saved = await ToolModel.create(equipment);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    return res.json(req.equipment);
  })
  .patch(async (req, res, next) => {
    const equipment = req.body;

    try {
      const updated = await req.equipment.set(equipment).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleted = await req.equipment.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;


module.exports = router;
