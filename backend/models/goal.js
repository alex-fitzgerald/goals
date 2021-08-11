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
  }
});

// const goal1 = new KwmlGoal({goal: "Testing the schema", category: "Test"});

// // goal1.save()

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("KwmlGoal", kwmlGoalSchema, "kwmlGoals")