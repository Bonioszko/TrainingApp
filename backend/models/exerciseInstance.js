const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseInstanceSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    sets: [
        {
            kilograms: { type: Number, required: true },
            repetitions: { type: Number, required: true },
        },
    ],
});
module.exports = mongoose.model("ExerciseInstance", ExerciseInstanceSchema);
