import { combineReducers } from "redux";
import { combineEpics } from 'redux-observable';

import createGoalReducer from "../Pages/CreateArea/state/reducer";

export const rootReducer = combineReducers({
    createGoal: createGoalReducer
});

export const rootEpic = combineEpics({

});

