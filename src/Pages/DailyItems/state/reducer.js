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
                ...state,
                goalsFetching: true
            }
        case GoalActionTypes.FETCH_GOALS_SUCCESS:
            return {
                ...state,
                goalsFetching: false,
                goalsFetched: true,
                goals: action.payload,
                error: null
            }
        case GoalActionTypes.FETCH_GOALS_ERROR:
            return {
                ...state,
                goalsFetching: false,
                goalsFetched: false,
                error: action.payload
            }
        default:
            return state
    }
}