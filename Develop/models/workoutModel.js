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
         
    },
    duration:{
        type: Number,
        required: "Enter a duration."
    },
    weight:{

    },
    reps:{

    },
    sets:{

    },
    distance:{
        // not required
    }
        }
    ]
})
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
