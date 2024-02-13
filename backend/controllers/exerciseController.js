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
const deleteExercise = asyncHandler(async (req, res, next) => {
    const { exerciseName, email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "user do not exists" });
    }
    console.log(user._id);

    const exercise = await Exercise.findOneAndDelete({
        name: exerciseName,
        creator: user._id,
    });
    if (!exercise) {
        return res.status(404).json({ error: "exercise not found" });
    }
    return res.status(200).json({ message: "exercise deleted successfully" });
});
const addExercise = asyncHandler(async (req, res, next) => {
    const { exerciseName, bodyPart, email } = req.body;
    if (!exerciseName || !bodyPart) {
        return res
            .status(400)
            .json({ error: "Please provide exercise name and body part" });
    }
    if (!bodyParts.includes(bodyPart)) {
        return res.status(400).json({ error: "provide valid body part" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "user do not exists" });
    }
    const existingExercise = await Exercise.findOne({
        name: exerciseName,
        creator: user._id,
    });
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
    let userExercises = [];
    if (user._id != "65ca7d708bbdfbcd9c4c8ee0") {
        userExercises = await Exercise.find({ creator: user._id });
    }

    const otherExercises = await Exercise.find({
        creator: "65ca7d708bbdfbcd9c4c8ee0",
    });

    const allExercises = [...userExercises, ...otherExercises];

    res.status(200).json({
        title: "allExercises",
        exercises_list: allExercises,
    });
});
module.exports = {
    getAllExercises,
    addExercise,
    getAllUserExercises,
    deleteExercise,
};
