const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    addTrainingTemplate,
    getAllUserTrainingsTemplates,
    getAllTrainigns,
} = require("../controllers/trainingController");
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

router.post("/", addTrainingTemplate);
router.get("/", getAllTrainigns);
router.get("/:email", getAllUserTrainingsTemplates);

module.exports = router;
