let express = require("express");
let app = express();
let Port = 3000;
let cors = require("cors");

app.use(cors());

let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

function addActivity(activities, newActivity) {
  activities.push(newActivity);
  return activities;
}

app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  let newActivity = { activityId, type, duration, caloriesBurned };
  let result = addActivity(activities, newActivity);
  res.json({ activities: result });
});

function sortActivityByDurationAscending(a, b) {
  return a.duration - b.duration;
}

app.get("/activities/sort-by-duration", (req, res) => {
  let sortedActivities = activities.sort(sortActivityByDurationAscending);
  res.json({ activities: sortedActivities });
});

function filterActivityByType(activities, type) {
  return activities.filter((activity) => activity.type === type);
}

app.get("/activities/filter-by-type", (req, res) => {
  let type = req.query.type;
  let filteredActivities = filterActivityByType(activities, type);
  res.json({ activities: filteredActivities });
});

function calculateTotalCaloriesBurned(activities) {
  let totalCaloriesBurned = 0;
  for (let activity of activities) {
    totalCaloriesBurned += activity.caloriesBurned;
  }
  return totalCaloriesBurned;
}

app.get("/activities/total-calories", (req, res) => {
  let totalCaloriesBurned = calculateTotalCaloriesBurned(activities);
  res.json({ totalCaloriesBurned });
});

function updateDuration(activities, activityId, duration) {
  for (let activity of activities) {
    if (activity.activityId === activityId) {
      activity.duration = duration;
      break;
    }
  }
  return activities;
}

app.get("/activities/update-duration", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updateDuration(activities, activityId, duration);
  res.json({ activities: result });
});

app.get("/activities/delete", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  activities = activities.filter(
    (activity) => activity.activityId !== activityId,
  );
  res.json({ activities });
});

app.get("/activities/delete-by-type", (req, res) => {
  let type = req.query.type;
  activities = activities.filter((activity) => activity.type !== type);
  res.json({ activities });
});

app.listen(Port, () => {
  console.log("Server is running on https:localhost:" + Port);
});
