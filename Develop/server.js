const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");
const PORT = process.env.PORT || 3000;

let db = require("./models/");
const { Workout } = require("./models/");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// API ROUTES
app.put("/api/workouts/:id", ({ params }, res) => {
  const newWorkout = res.req.body;
  Workout.findByIdAndUpdate(
    {
      _id: mongoose.Types.ObjectId(params.id)
    },
    {
      $push: {
        exercises:
          [{
            type: newWorkout.type,
            name: newWorkout.name,
            totalDuration: newWorkout.totalDuration,
            weight: newWorkout.weight,
            reps: newWorkout.reps,
            sets: newWorkout.sets,
            distance: newWorkout.distance
          }]
      }

    })
    .then(dbWorkout => {
      // console.log(dbWorkout, 'werkout')
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts/", ({ body }, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create({
    type: body.type,
    name: body.name,
    totalDuration: body.totalDuration,
    weight: body.weight,
    reps: body.reps,
    sets: body.sets,
    distance: body.distance
  })
    .then(dbWorkout => {
      console.log(dbWorkout);
      console.log(res);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
app.get("/api/workouts/range", ({ body }, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
})

// HTML ROUTES
app.get("/stats", ({ body }, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));

});
app.get("/exercise", ({ body }, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});