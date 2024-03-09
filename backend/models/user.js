const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },
});

module.exports = mongoose.model("User", UserSchema);
