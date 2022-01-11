import { filter, map, mapTo, mergeMap } from 'rxjs/operators';
import { ofType, of } from 'redux-observable';
import { CreateGoalActionTypes } from './types';
import { addItem } from '../../../firebase/firebase.utils';
import { createItemSuccess } from './actions';

const createGoalEpic = action$ => action$.pipe(
    ofType(CreateGoalActionTypes.CREATE_ITEM_START),
    map((action) => {
        const response = addItem(action.payload)
        return createItemSuccess(response)
    })
)

export default createGoalEpic