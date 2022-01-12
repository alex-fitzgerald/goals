
import { fetchGoals } from "../../../firebase/firebase.utils";
import { ofType } from "redux-observable";
import { map } from "rxjs";
import { GoalActionTypes } from "./types";

export const fetchGoalsEpic = action$ => action$.pipe(
    ofType(GoalActionTypes.FETCH_GOALS_START),
    map(() => {
        const goals = fetchGoals()
        return goals
    }),
    map(action => {
        console.log(action)
    })
)