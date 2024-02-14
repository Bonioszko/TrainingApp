const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose.connect(process.env.MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/auth", require("./routes/authRouter"));
app.use("/exercise", require("./routes/exerciseRouter"));
app.use("/training", require("./routes/trainingRouter"));
app.use("/trainingInstance", require("./routes/trainingInstanceRouter"));
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
