const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseInstanceSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    name: { type: String, required: true },
    sets: [
        {
            kilograms: { type: Number },
            repetitions: { type: Number },
        },
    ],
});
module.exports = mongoose.model("ExerciseInstance", ExerciseInstanceSchema);
