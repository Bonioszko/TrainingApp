const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    addTrainingTemplate,
    getAllUserTrainingsTemplates,
    getAllTrainings,
    deleteTrainingTemplate,
} = require("../controllers/trainingController");
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

router.post("/", addTrainingTemplate);

router.get("/", getAllTrainings);
router.get("/:email", getAllUserTrainingsTemplates);
router.delete("/", deleteTrainingTemplate);

module.exports = router;
