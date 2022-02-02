
import { fetchGoals } from "../../../firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { ofType } from "redux-observable";
import { map } from "rxjs";
import { GoalActionTypes } from "./types";
import { fetchGoalsSuccess } from "./actions";


export const fetchGoalsEpic = action$ => action$.pipe(
    // ofType(GoalActionTypes.FETCH_GOALS_START),
    // map(() => {
    //     fetchGoals().pipe(
    //         map(action => {
    //             console.log(action)
    //             console.log('dispatched')
    //         })
    //     );
    //     // const dispatch = useDispatch();
    //     // console.log(goals)
    //     // dispatch(fetchGoalsSuccess(goals));
    //     // return goals;
    // }),
)