const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    addTrainingTemplate,
    getAllUserTrainingsTemplates,
    getAllTrainings,
    deleteTrainingTemplate,
} = require("../controllers/trainingController");
const allowedOrigins = [
    "http://localhost:5173",
    "https://trainingapp-1.onrender.com",
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
router.post("/", addTrainingTemplate);

router.get("/", getAllTrainings);
router.get("/:email", getAllUserTrainingsTemplates);
router.delete("/", deleteTrainingTemplate);

module.exports = router;
