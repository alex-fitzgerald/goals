import { combineReducers } from "redux";
import { combineEpics } from 'redux-observable';

import createGoalReducer from "../Pages/CreateArea/state/reducer";
import createGoalEpic from "../Pages/CreateArea/state/epic";

export const rootReducer = combineReducers({
    newGoal: createGoalReducer
});

export const rootEpic = combineEpics(
    createGoalEpic
);

