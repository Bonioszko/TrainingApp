const express = require("express");
const router = express.Router();

const {
    getAllExercises,
    addExercise,
    getAllUserExercises,
} = require("../controllers/exerciseController");

const cors = require("cors");

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

router.get("/", getAllExercises);
router.post("/", addExercise);
router.get("/:email", getAllUserExercises);
module.exports = router;
