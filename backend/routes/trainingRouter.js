const express = require("express");
const router = express.Router();
const cors = require("cors");
const { addTrainingTemplate } = require("../controllers/trainingController");
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

router.post("/", addTrainingTemplate);
module.exports = router;
