const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
    res.json("test is wotrking ");
};
//registering user
const registerUser = asyncHandler(async (req, res, next) => {
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        const result = await user.save();

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
                {
                    email: user.email,
                    id: user._id,
                    name: user.name,
                },
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
        try {
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
                const userReturn = await User.findOne({ _id: user.id });

                if (err) throw err;
                return res.json(userReturn);
            });
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.status(401).json({
                    error: "Session expired. Please log in again.",
                });
            } else {
                res.status(500).json({
                    error: "An error occurred while verifying the token.",
                });
            }
        }
    } else {
        res.json(null);
    }
};
const updateUser = asyncHandler(async (req, res) => {
    const { token } = req.cookies;
    const { height, weight } = req.body;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
                if (err) throw err;
                if (height) {
                    const updatedUser = await User.findByIdAndUpdate(
                        user.id,
                        { height: height },
                        { new: true }
                    );

                    if (!updatedUser) {
                        return res
                            .status(404)
                            .json({ error: "User not found" });
                    }

                    res.status(200).json(updatedUser);
                } else if (weight) {
                    const updatedUser = await User.findByIdAndUpdate(
                        user.id,
                        { weight: weight },
                        { new: true }
                    );

                    if (!updatedUser) {
                        return res
                            .status(404)
                            .json({ error: "User not found" });
                    }

                    res.status(200).json(updatedUser);
                } else {
                    return res.status(404).json({ error });
                }
            });
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // The token has expired
                res.status(401).json({
                    error: "Session expired. Please log in again.",
                });
            } else {
                // Some other error occurred
                res.status(500).json({
                    error: "An error occurred while verifying the token.",
                });
            }
        }
    } else {
        res.status(401).json({ error: "No token provided" });
    }
});
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
    updateUser,
};
