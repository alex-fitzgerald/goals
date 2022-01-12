import { GoalActionTypes } from "./types";

const INITIAL_STATE = {
    goals: [],
    goalsFetching: false,
    goalsFetched: false,
    error: null
}

export const goalReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case GoalActionTypes.FETCH_GOALS_START:
            return {
                goalsFetching: true,
                ...state
            }
        case GoalActionTypes.FETCH_GOALS_SUCCESS:
            return {
                goalsFetching: false,
                goalsFetched: true,
                goals: action.payload,
                error: null,
                ...state
            }
        case GoalActionTypes.FETCH_GOALS_ERROR:
            return {
                goalsFetching: false,
                goalsFetched: false,
                error: action.payload,
                ...state
            }
        default:
            return state
    }
}