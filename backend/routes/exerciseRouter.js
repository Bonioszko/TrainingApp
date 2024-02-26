const express = require("express");
const router = express.Router();

const {
    getAllExercises,
    addExercise,
    getAllUserExercises,
    deleteExercise,
} = require("../controllers/exerciseController");

const cors = require("cors");

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

router.get("/", getAllExercises);
router.post("/", addExercise);
router.get("/:email", getAllUserExercises);
router.delete("/", deleteExercise);
module.exports = router;
