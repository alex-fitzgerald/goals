import { CreateGoalActionTypes } from "./types";

const INITIAL_STATE = {
    goal: "",
    category: "",
    scope: "",
    isPinned: "",
    submittingGoal:false,
    errorMessage: null
}

const createGoalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CreateGoalActionTypes.CREATE_ITEM_START: 
            return {
                ...state,
                submittingGoal: true
            }
        case CreateGoalActionTypes.CREATE_ITEM_SUCCESS:
            return {
                ...state,
                submittingGoal: false,
                errorMessage: false
            }
        case CreateGoalActionTypes.CREATE_ITEM_ERROR:
            return {
                ...state,
                submittingGoal: false,
                errorMessage: action.payload.error
            }
        default:
            return state;
    }
}

export default createGoalReducer