
import { fetchGoals } from "../../../firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { ofType } from "redux-observable";
import { map, mapTo, mergeMap } from "rxjs";
import { GoalActionTypes } from "./types";
import { fetchGoalsSuccess } from "./actions";

export const fetchGoalsEpic = action$ => action$.pipe(
    ofType(GoalActionTypes.FETCH_GOALS_START),
    mergeMap(() => {
        return fetchGoals();
    }),
    map(items => {
        return fetchGoalsSuccess(items)
    })
)
