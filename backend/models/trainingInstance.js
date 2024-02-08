const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingInstance = new Schema({
    doneBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseInstance" }],
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("TrainingInstance", TrainingInstance);
