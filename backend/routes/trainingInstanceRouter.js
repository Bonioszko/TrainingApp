const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    createTrainingInstance,
    getTrainingInstance,
} = require("../controllers/trainingInstanceController");
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
router.post("/", createTrainingInstance);
router.get("/", getTrainingInstance);
module.exports = router;
