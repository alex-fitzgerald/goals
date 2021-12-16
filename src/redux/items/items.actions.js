import { itemsActionTypes } from "./items.types";

export const addItemStart = (item, user) => ({
    type: itemsActionTypes.ADD_ITEM_START,
    payload: {item, user}
});

export const addItemSuccess = (id, item) => ({
    type: itemsActionTypes.ADD_ITEM_SUCCESS,
    payload: {id, item}
});

export const addItemFailure = errorMessage => ({
    type: itemsActionTypes.ADD_ITEM_FAILURE,
    payload: errorMessage
});

export const fetchItemsStart = user => ({
    type: itemsActionTypes.FETCH_ITEMS_START,
    payload: user
});

export const fetchItemsSuccess = items => ({
    type: itemsActionTypes.FETCH_ITEMS_SUCCESS,
    payload: items
});

export const fetchItemsFailure = errorMessage => ({
    type: itemsActionTypes.FETCH_ITEMS_FAILURE,
    payload: errorMessage
});

export const deleteItemStart = itemId => ({
    type: itemsActionTypes.DELETE_ITEM_START,
    payload: itemId
});

export const deleteItemSuccess = () => ({
    type: itemsActionTypes.DELETE_ITEM_SUCCESS
});

export const deleteItemFailure = errorMessage => ({
    type: itemsActionTypes.DELETE_ITEM_FAILURE,
    payload: errorMessage
});
