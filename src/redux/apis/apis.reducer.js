import { apisActionTypes } from "./apis.types";

const INITIAL_STATE = { 
    philosophy: {content: "Loading", author: null},
    stoicism: {content: "Loading", author: null},
    poem: {content: "Loading", author: null},
    haveFetchedStoicism: false,
    errorMessage: null
}

const apisReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case apisActionTypes.FETCH_STOICISM_START:
            return {
                ...state
            }
        case apisActionTypes.FETCH_STOICISM_SUCCESS:
            return {
                ...state,
                stoicism: action.payload,
                haveFetchedStoicism: true
            }
        case apisActionTypes.FETCH_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default apisReducer
        