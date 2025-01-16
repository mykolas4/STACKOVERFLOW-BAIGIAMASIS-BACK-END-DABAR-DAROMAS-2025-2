const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const userRoutes = require("./routes/users.js");

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch(() => {
    console.log("bad connection");
  });

app.get("/", (req, res) => {
  res.json({ message: "The app is alive!" });
});

app.use("/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({ response: "your endpoint does not exit" });
});

app.listen(process.env.PORT, () => {
  console.log(`App was started on port ${process.env.PORT}`);
});
