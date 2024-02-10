const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingInstanceSchema = new Schema({
    name: { type: String, required: true },
    doneBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseInstance" }],
    date: { type: Date, default: Date.now },
});
TrainingInstanceSchema.index({ name: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("TrainingInstance", TrainingInstanceSchema);
