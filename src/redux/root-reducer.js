import { combineReducers } from 'redux';
import apisReducer from './apis/apis.reducer';
import itemsReducer from './items/items.reducer';

const rootReducer = combineReducers({
    apis: apisReducer,
    items: itemsReducer
});

export default rootReducer;