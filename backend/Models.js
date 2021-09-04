const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const KwmlGoal = mongoose.model("KwmlGoal", kwmlGoalSchema);

const userSchema = {
  email: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  }  
}

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
  },
  isPinned: {
    type: Boolean
  }
});

const kwmlGoalModel = mongoose.model("KwmlGoal", kwmlGoalSchema, "kwmlgoals");
const userModel = mongoose.model("User", userSchema, "users");

module.exports = {
  kwmlGoalModel,
  userModel
}
