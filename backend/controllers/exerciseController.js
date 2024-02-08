const Exercise = require("../models/exercise");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bodyParts = require("../helpers/bodyParts");
const getAllExercises = asyncHandler(async (req, res, next) => {
    const allExercises = await Exercise.find();

    res.status(200).json({
        title: "allExercises",
        exercises_list: allExercises,
    });
});
const addExercise = asyncHandler(async (req, res, next) => {
    const { exerciseName, bodyPart, email } = req.body;
    if (!exerciseName || !bodyPart) {
        return res
            .status(400)
            .json({ erro: "Please provide exercise name and body part" });
    }
    if (!bodyParts.includes(bodyPart)) {
        res.status(400).json({ erro: "provide valid body part" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400).json({ error: "user do not exists" });
    }
    const existingExercise = await Exercise.findOne({ name: exerciseName });
    if (existingExercise) {
        return res.status(400).json({ error: "Exercise already exists" });
    }
    const exercise = new Exercise({
        name: exerciseName,
        bodyPart: bodyPart,
        creator: user._id,
    });
    const result = await exercise.save();
    return res.status(200).json({ message: "exercise succesfully added" });
});
const getAllUserExercises = asyncHandler(async (req, res, next) => {
    const { email } = req.params;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    const allExercises = await Exercise.find({
        creator: { $in: [null, user._id] },
    });

    res.status(200).json({
        title: "allExercises",
        exercises_list: allExercises,
    });
});
module.exports = {
    getAllExercises,
    addExercise,
    getAllUserExercises,
};
