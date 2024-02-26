const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    createTrainingInstance,
    getTrainingInstance,
    changeTrainingInstance,
    getTrainingsInstancesForUser,
} = require("../controllers/trainingInstanceController");
const allowedOrigins = [
    "http://localhost:5173",
    "https://trainingapp-1.onrender.com/",
];
router.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);
router.post("/", createTrainingInstance);
router.get("/", getTrainingInstance);
router.get("/:email/:date", getTrainingsInstancesForUser);
router.put("/", changeTrainingInstance);
module.exports = router;
