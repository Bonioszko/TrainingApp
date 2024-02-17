const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    createTrainingInstance,
    getTrainingInstance,
    changeTrainingInstance,
    getTrainingsInstancesForUser,
} = require("../controllers/trainingInstanceController");
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
router.post("/", createTrainingInstance);
router.get("/", getTrainingInstance);
router.get("/:email/:date", getTrainingsInstancesForUser);
router.put("/", changeTrainingInstance);
module.exports = router;
