import { GoalActionTypes } from "./types";

export const fetchGoalsStart = () => ({
    type: GoalActionTypes.FETCH_GOALS_START
});

export const fetchGoalsSuccess = goals => ({
    type: GoalActionTypes.FETCH_GOALS_SUCCESS,
    payload: goals
})

export const fetchGoalsError = error => ({
    type: GoalActionTypes.FETCH_GOALS_ERROR,
    payload: error
});