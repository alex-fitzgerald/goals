import { CreateGoalActionTypes } from "./types"

export const createItemStart = item => ({
    type: CreateGoalActionTypes.CREATE_ITEM_START,
    payload: item
})

export const createItemSuccess = () => ({
    type: CreateGoalActionTypes.CREATE_ITEM_SUCCESS
})

export const createItemError = error => ({
    type: CreateGoalActionTypes.CREATE_ITEM_ERROR,
    payload: error
})