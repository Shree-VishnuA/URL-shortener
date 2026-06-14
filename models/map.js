const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
});

//MODEL
const Map = mongoose.model("Map", mapSchema);
module.exports = Map;
