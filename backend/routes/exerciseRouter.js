const express = require("express");
const router = express.Router();

const {
    getAllExercises,
    addExercise,
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
module.exports = router;
