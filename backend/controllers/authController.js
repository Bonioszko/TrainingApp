const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
    res.json("test is wotrking ");
};
//registering user
const registerUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide all fields" });
    }

    // Check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: "Please provide a valid email" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user
        const result = await user.save();

        // Redirect to home page
        // res.redirect("/");
        return res.status(200).json({ message: "user created succesfuly" });
    } catch (err) {
        return next(err);
    }
});

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "no user found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "passwords do not match" });
        } else {
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(user);
                }
            );
            // return res.status(200).json({ message: "passwords match" });
        }
    } catch (err) {
        console.log(err);
    }
};
const getProfile = async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};
const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ logout: true });
};
module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logout,
};
