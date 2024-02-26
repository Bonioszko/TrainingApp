const express = require("express");
const router = express.Router();
const {
    test,
    registerUser,
    loginUser,
    getProfile,
    logout,
} = require("../controllers/authController");
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

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", logout);
module.exports = router;
