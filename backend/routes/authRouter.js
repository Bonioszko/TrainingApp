const express = require("express");
const router = express.Router();
const {
    test,
    registerUser,
    loginUser,
    getProfile,
    logout,
    updateUser,
} = require("../controllers/authController");
// const cors = require("cors");

// router.use(
//     cors({
//         origin: [
//             "http://localhost:5173",
//             "http://localhost:3000",
//             "https://trainingappfull.onrender.com",
//         ],
//         credentials: true,
//     })
// );

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.patch("/profile", updateUser);
router.post("/logout", logout);
module.exports = router;
