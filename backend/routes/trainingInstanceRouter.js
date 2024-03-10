const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    createTrainingInstance,
    getTrainingInstance,
    changeTrainingInstance,
    getTrainingsInstancesForUser,
    getTrainingsInstancesForUserCount,
} = require("../controllers/trainingInstanceController");
// router.use(
//     cors({
//         origin: [
//             "http://localhost:5173",
//             "http://localhost:3000",
//             "https://trainingapp-1.onrender.com",
//         ],
//         credentials: true,
//     })
// );
router.post("/", createTrainingInstance);
router.get("/", getTrainingInstance);
router.get("/count/:email", getTrainingsInstancesForUserCount);
router.get("/:email/:date", getTrainingsInstancesForUser);
router.put("/", changeTrainingInstance);
module.exports = router;
