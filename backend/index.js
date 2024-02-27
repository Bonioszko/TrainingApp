const express = require("express");
const dotenv = require("dotenv").config();
import path from "path";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("/", (req, res) => {
    return res.json("test is wotrking ");
});
app.use("/auth", require("./routes/authRouter"));
app.use("/exercise", require("./routes/exerciseRouter"));
app.use("/training", require("./routes/trainingRouter"));
app.use("/trainingInstance", require("./routes/trainingInstanceRouter"));
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
