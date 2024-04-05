const Exercise = require("../models/exercise");
const User = require("../models/user");
const TrainingTemplate = require("../models/trainingTemplate");
const TrainingInstance = require("../models/trainingInstance");
const ExerciseInstance = require("../models/exerciseInstance");
const asyncHandler = require("express-async-handler");
const exercise = require("../models/exercise");
const trainingInstance = require("../models/trainingInstance");

const getTrainingInstance = asyncHandler(async (req, res, next) => {
    const { name, date } = req.body;
});
const changeTrainingInstance = asyncHandler(async (req, res, next) => {
    const { name, date, exercises } = req.body;

    const exercisesArray = (await TrainingInstance.findOne({ name, date }))
        .exercises;

    for (let i = 0; i < exercisesArray.length; i++) {
        const exercise = exercisesArray[i];

        const result = await ExerciseInstance.updateOne(
            { _id: exercise },
            { $set: { sets: exercises[i].sets } }
        );
    }

    if (exercisesArray.length) {
        res.status(200).json({ message: "Update successful" });
    } else {
        res.status(400).json({ message: "Update failed" });
    }
});
const getTrainingsInstancesForUserCount = asyncHandler(
    async (req, res, next) => {
        const { email } = req.params;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const countTrainingInstances = await TrainingInstance.aggregate([
            { $match: { doneBy: user._id } },
            { $count: "User_trainings" },
        ]);
        console.log(countTrainingInstances);
        const userTrainingsCount =
            countTrainingInstances.length > 0
                ? countTrainingInstances[0].User_trainings
                : 0;
        return res.status(200).json({ userTrainingsCount });
    }
);
const getTrainingsInstancesForUser = asyncHandler(async (req, res, next) => {
    const { email, date } = req.params;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }
    const allTrainingInstances = await TrainingInstance.find({
        doneBy: user._id,
        date: date,
    }).populate("exercises");

    if (allTrainingInstances) {
        res.status(200).json({
            title: "allTrainingInstances",
            trainings_list: allTrainingInstances,
        });
    } else {
        return res
            .status(400)
            .json({ message: "User does not have trainings" });
    }
});
const getLastTrainingsInstancesForUser = asyncHandler(
    async (req, res, next) => {
        const { email, nameTemplate } = req.params;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const nearestTrainingInstance = await TrainingInstance.findOne({
            doneBy: user._id,
            template: nameTemplate,
            date: { $lte: new Date() },
        })
            .sort({ date: -1 })
            .populate("exercises");

        if (nearestTrainingInstance) {
            res.status(200).json({
                training: nearestTrainingInstance,
            });
        } else {
            return res
                .status(400)
                .json({ message: "User does not have trainings" });
        }
    }
);
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

    // if (!date) {
    //     date = new Date();
    // }
    const trainingInstance = new TrainingInstance({
        name: name,
        doneBy: user._id,
        exercises: [],
        template: trainingTemplate._id,
        date: date,
    });
    try {
        let savePromises = trainingTemplate.exercises.map(
            (exerciseTemplate) => {
                const exercise = new ExerciseInstance({
                    exercise: exerciseTemplate,
                    name: exerciseTemplate.name,
                    sets: [],
                });

                return exercise.save();
            }
        );

        const savedExercises = await Promise.all(savePromises);
        trainingInstance.exercises = savedExercises;

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

module.exports = {
    createTrainingInstance,
    getTrainingInstance,
    changeTrainingInstance,
    getTrainingsInstancesForUser,
    getTrainingsInstancesForUserCount,
    getLastTrainingsInstancesForUser,
};
