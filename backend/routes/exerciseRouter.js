const express = require("express");
const router = express.Router();

const {
    getAllExercises,
    addExercise,
    getAllUserExercises,
    deleteExercise,
} = require("../controllers/exerciseController");

const cors = require("cors");

router.use(
    cors({
        origin: ["http://localhost:5173", "https://trainingapp-1.onrender.com"],
        credentials: true,
    })
);

router.get("/", getAllExercises);
router.post("/", addExercise);
router.get("/:email", getAllUserExercises);
router.delete("/", deleteExercise);
module.exports = router;
