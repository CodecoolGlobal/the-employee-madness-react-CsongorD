const express = require("express");
const router = express.Router();

const GameModel = require("../db/game.model");

router.use("/:id", async (req, res, next) => {
  let game = null;

  try {
    game = await GameModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }
  if (!game) {
    return res.status(404).end("Game not found");
  }

  req.game = game;

  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const games = await GameModel.find().sort({ created: "desc" }).lean();
    return res.json(games);
  })
  .post(async (req, res, next) => {
    const game = req.body;

    try {
      const saved = await GameModel.create(game);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    return res.json(req.game);
  })
  .patch(async (req, res, next) => {
    const game = req.body;

    try {
      const updated = await req.game.set(game).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleted = await req.game.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
