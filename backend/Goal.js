const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const KwmlGoal = mongoose.model("KwmlGoal", kwmlGoalSchema);

const kwmlGoalSchema = Schema({
  goal: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  type: {
    type: String
  },
  scope: {
   type: String
  }
});

const mindsetSchema = Schema({
  mindset: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  scope: {
    type: String
  }
}) 

const reminderSchema = Schema({
  reminder: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  category: {
    type: String
  },
  scope: {
    type: String
  }
}) 

const kwmlGoalModel = mongoose.model("KwmlGoal", kwmlGoalSchema, "kwmlgoals")
const mindsetModel = mongoose.model("Mindset", mindsetSchema, "mindsets")
const reminderModel = mongoose.model("Reminder", reminderSchema, "reminders")

module.exports = {
  kwmlGoalModel,
  mindsetModel,
  reminderModel
}
