require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/employees");
const equipmentRouter = require("./routes/equipments");
const divisionRouter = require("./routes/divisions");
const toolsRouter = require("./routes/tools");
const kittenRouter = require("./routes/kittens");
const gamesRouter = require("./routes/games");

const app = express();
const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

app.use(express.json());
app.use("/api/employees/", employeeRouter);
app.use("/api/equipments/", equipmentRouter);
app.use("/api/divisions/", divisionRouter);
app.use("/api/tools/", toolsRouter);
app.use("/api/kittens/", kittenRouter);
app.use("/api/games/", gamesRouter);

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`);
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
