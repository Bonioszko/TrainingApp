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
    console.log(date);
});
const changeTrainingInstance = asyncHandler(async (req, res, next) => {
    const { name, date, exercises } = req.body;

    const exercisesArray = (await TrainingInstance.findOne({ name, date }))
        .exercises;

    for (let i = 0; i < exercisesArray.length; i++) {
        const exercise = exercisesArray[i];
        console.log(exercises[i].sets);

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
const getTrainingsInstancesForUser = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }
    const allTrainingInstances = await TrainingInstance.find({
        doneBy: user._id,
    }).populate("exercises");
    if (allTrainingInstances) {
        res.status(200).json({
            title: "allTrainingInstances",
            trainings_list: allTrainingInstances,
        });
    } else {
        return res.status(400).json({ message: "User does not have trainins" });
    }
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
    // for (let i = 0; i < trainingTemplate.exercises.length; i++) {
    //     console.log(trainingTemplate.exercises[i]);
    //     const exercise = new ExerciseInstance({
    //         exercise: trainingTemplate.exercises[i],
    //         sets: [],
    //     });

    //     Promise.all(savePromises)
    //         .then((savedExercises) => {
    //             trainingInstance.exercises.push(savedExercises);
    //         })
    //         .catch((error) => {
    //             console.error("Error saving exercises: ", error);
    //         });
    // }

    // let savePromises = trainingTemplate.exercises.map((exerciseTemplate) => {
    //     const exercise = new ExerciseInstance({
    //         exercise: exerciseTemplate,
    //         sets: [],
    //     });

    //     return exercise.save();
    // });

    // Promise.all(savePromises)
    //     .then((savedExercises) => {
    //         trainingInstance.exercises = savedExercises;
    //         // Now you can save trainingInstance or do whatever you need with it
    //     })
    //     .catch((error) => {
    //         console.error("Error saving exercises: ", error);
    //     });
    // try {
    //     const result = await trainingInstance.save();
    //     return res.status(200).json({ trainingInstance: result });
    // } catch (err) {
    //     if (err.code == 11000) {
    //         return res.status(400).json({
    //             error: "You already have training of the same name done today",
    //         });
    //     } else {
    //         return res
    //             .status(500)
    //             .json({ error: "An error occurred while saving the training" });
    //     }
    // }
});
///make an api call to get the exercises, populate them from training

module.exports = {
    createTrainingInstance,
    getTrainingInstance,
    changeTrainingInstance,
    getTrainingsInstancesForUser,
};
