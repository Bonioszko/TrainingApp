const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
    addTrainingTemplate,
    getAllUserTrainingsTemplates,
    getAllTrainings,
    deleteTrainingTemplate,
} = require("../controllers/trainingController");
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
router.post("/", addTrainingTemplate);

router.get("/", getAllTrainings);
router.get("/:email", getAllUserTrainingsTemplates);
router.delete("/", deleteTrainingTemplate);

module.exports = router;
