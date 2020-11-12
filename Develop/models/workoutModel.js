const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise type is required."
            },
            name: {
                type: String,
                trim: true,
                required: "Exercise name is required."
            },
            totalDuration: {
                type: Number,
                required: "Enter a duration."
            },
            weight: {
                type: Number,
               
            },
            reps: {
                type: Number,

            },
            sets: {
                type: Number

            },
            distance: {
                type: Number
                // not required
            }
        }
    ]
})
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
