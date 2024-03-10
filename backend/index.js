const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const currentDirectory = process.cwd();
const app = express();
app.use(express.static(path.join(currentDirectory, "/frontend/dist")));

app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
app.get("/", (req, res) => {
    return res.json("test is wotrking ");
});

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/exercise", require("./routes/exerciseRouter"));
app.use("/api/training", require("./routes/trainingRouter"));
app.use("/api/trainingInstance", require("./routes/trainingInstanceRouter"));
app.get("*", (req, res) => {
    res.sendFile(path.join(currentDirectory, "frontend", "dist", "index.html"));
});
