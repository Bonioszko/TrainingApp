const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParts = require("../helpers/bodyParts");
const ExerciseSchema = new Schema({
    name: { type: String, unique: true, required: true },
    bodyPart: {
        type: String,
        enum: bodyParts,
        required: true,
    },
    creator: { type: Schema.Types.ObjectId, ref: "User", default: null },
});
module.exports = mongoose.model("Exercise", ExerciseSchema);
