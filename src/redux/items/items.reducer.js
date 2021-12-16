import { itemsActionTypes } from "./items.types";

const INITIAL_STATE = { 
    items: {},
    errorMessage: null,
    haveFetchedReminders:false
}

const itemsReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case itemsActionTypes.ADD_ITEM_START:
            return {
                ...state
            };
        case itemsActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                items: {[action.payload.id]:action.payload.item, ...state.items },
                errorMessage:null,
            };
        case itemsActionTypes.ADD_ITEM_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        case itemsActionTypes.FETCH_ITEMS_START:
            return {
                ...state
            };
        case itemsActionTypes.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                errorMessage: null,
                haveFetchedReminders:true
            };
        case itemsActionTypes.FETCH_ITEMS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        case itemsActionTypes.DELETE_ITEM_START:
            return {
                ...state
            };
        case itemsActionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                reminders: action.payload,
                errorMessage: null,
                haveFetchedReminders:true
            };
        case itemsActionTypes.DELETE_ITEM_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
}

export default itemsReducer
        