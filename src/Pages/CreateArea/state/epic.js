import { map, filter, tap, mapTo, mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable';
import { CreateGoalActionTypes } from './types';
import { addItem } from '../../../firebase/firebase.utils';
import { createItemSuccess } from './actions';
import axios from 'axios';

const createGoalEpic = action$ => action$.pipe(
        filter(action => action.type === CreateGoalActionTypes.CREATE_ITEM_START),
        mapTo({ type: CreateGoalActionTypes.CREATE_ITEM_SUCCESS }) 
);  


export default createGoalEpic