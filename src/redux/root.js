import { combineReducers } from "redux";
import { combineEpics } from 'redux-observable';

import createGoalReducer from "../Pages/CreateArea/state/reducer";
import { goalReducer } from "../Pages/DailyItems/state/reducer";
import createGoalEpic from "../Pages/CreateArea/state/epic";
import { fetchGoalsEpic } from "../Pages/DailyItems/state/epic";

export const rootReducer = combineReducers({
    newGoal: createGoalReducer,
    goals: goalReducer
});

export const rootEpic = combineEpics(
    createGoalEpic,
    fetchGoalsEpic
);

