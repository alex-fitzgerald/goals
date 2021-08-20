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
  scope: {
   type: String
  }
});




module.exports = mongoose.model("KwmlGoal", kwmlGoalSchema, "kwmlgoals")