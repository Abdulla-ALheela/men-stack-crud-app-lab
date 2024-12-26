const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name:{type: String, required: true},
    description:{type: String, required: true},
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;