const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingTemplateSchema = new Schema({
    name: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "User", default: null },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});
TrainingTemplateSchema.index({ name: 1, creator: 1 }, { unique: true });
module.exports = mongoose.model("TrainingTemplate", TrainingTemplateSchema);
