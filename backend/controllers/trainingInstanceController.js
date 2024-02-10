const Exercise = require("../models/exercise");
const User = require("../models/user");
const TrainingTemplate = require("../models/trainingTemplate");
const TrainingInstance = require("../models/trainingInstance");
const asyncHandler = require("express-async-handler");

const getTrainingInstance = asyncHandler(async (req, res, next) => {
    const { name, date } = req.body;
    console.log(date);
});

const createTrainingInstance = asyncHandler(async (req, res, next) => {
    const { name, doneBy, date, nameTemplate, creator } = req.body;
    const user = await User.findOne({ email: doneBy });
    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }
    const trainingTemplate = await TrainingTemplate.findOne({
        name: nameTemplate,
        creator: creator,
    }).populate("exercises");
    console.log(trainingTemplate);
    // if (!date) {
    //     date = new Date();
    // }
    const trainingInstance = new TrainingInstance({
        name: name,
        doneBy: user._id,
        exercises: [],
        date: date,
    });
    for (let i = 0; i < trainingTemplate.exercises.length; i++) {
        console.log(trainingTemplate.exercises[i]);
        trainingInstance.exercises.push(trainingTemplate.exercises[i]);
    }
    try {
        const result = await trainingInstance.save();
        return res.status(200).json({ trainingInstance: result });
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: "You already have training of the same name done today",
            });
        } else {
            return res
                .status(500)
                .json({ error: "An error occurred while saving the training" });
        }
    }
});
///make an api call to get the exercises, populate them from training

module.exports = {
    createTrainingInstance,
    getTrainingInstance,
};
