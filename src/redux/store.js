import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { combineReducers } from "redux";
import { combineEpics } from 'redux-observable';

import createGoalReducer from "../Pages/CreateArea/state/reducer";
import { goalReducer } from "../Pages/DailyItems/state/reducer";
import createGoalEpic from "../Pages/CreateArea/state/epic";
import { fetchGoalsEpic } from "../Pages/DailyItems/state/epic";

const rootReducer = combineReducers({
    createGoal: createGoalReducer,
    goals: goalReducer
});

const rootEpic = combineEpics(
    createGoalEpic,
    fetchGoalsEpic
);

const epicMiddleware = createEpicMiddleware();

const middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer, 
  applyMiddleware(...middlewares)
);

epicMiddleware.run(rootEpic);

export default store
