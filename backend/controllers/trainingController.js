const Exercise = require("../models/exercise");
const User = require("../models/user");
const TrainingTemplate = require("../models/trainingTemplate");
const asyncHandler = require("express-async-handler");

const getAllTrainings = asyncHandler(async (req, res, next) => {
    const allTrainings = await TrainingTemplate.find();
    console.log(req.params);
    res.status(200).json({
        title: "allExercises",
        trainingTemplate_list: allTrainings,
    });
});
const addTrainingTemplate = asyncHandler(async (req, res, next) => {
    const { name, email, exercises } = req.body;
    console.log(name);
    let exercisesIds = [];
    if (exercises) {
        for (let i = 0; i < exercises.length; i++) {
            const id = await Exercise.findOne({ name: exercises[i] });
            if (id) {
                exercisesIds.push(id);
            }
        }
        if (exercisesIds.length == 0) {
            return res
                .status(400)
                .json({ error: "You must provide some valid exercises" });
        }
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }
    const trainingTemplate = new TrainingTemplate({
        name: name,
        creator: user._id,
        exercises: exercisesIds,
    });
    try {
        const result = await trainingTemplate.save();
        return res.status(200).json({ trainingTemplate: result });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: "A training with this name already exists for this user",
            });
        } else {
            return res
                .status(500)
                .json({ error: "An error occurred while saving the training" });
        }
    }
});
const getAllUserTrainingsTemplates = asyncHandler(async (req, res, next) => {
    const { email } = req.params;

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    const allTrainings = await TrainingTemplate.find({
        creator: { $in: [null, user._id] },
    });
    res.status(200).json({
        title: "allTrainingTemplates",
        trainingTemplates_list: allTrainings,
    });
});
const deleteTrainingTemplate = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "user do not exists" });
    }
    console.log(user._id);

    const trainingTemplate = await TrainingTemplate.findOneAndDelete({
        name: name,
        creator: user._id,
    });
    if (!trainingTemplate) {
        return res.status(404).json({ error: "Training template not found" });
    }
    return res
        .status(200)
        .json({ message: "Training template deleted successfully" });
});
module.exports = {
    addTrainingTemplate,
    getAllUserTrainingsTemplates,
    getAllTrainings,
    deleteTrainingTemplate,
};
