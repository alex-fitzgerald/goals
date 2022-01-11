import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { 
    rootReducer, 
    rootEpic 
} from './root';

const epicMiddleware = createEpicMiddleware();

const middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

epicMiddleware.run(rootEpic);

export default store;
