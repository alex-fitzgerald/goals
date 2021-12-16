import { takeEvery, call, put, all } from "@redux-saga/core/effects";
import REMINDERS_DATA from "../../Pages/Reminders/Reminders.data";
import { 
    fetchItemsSuccess, 
    fetchItemsFailure, 
    deleteItemSuccess, 
    deleteItemFailure, 
    addItemSuccess, 
    addItemFailure 
} from "./items.actions";
import { 
    writeItems,
    fetchItems
} from "../../firebase/firebase.utils";

import { itemsActionTypes } from "./items.types";

export function* fetchItemsAsync(user){
    try {
        const fetchedReminders = yield fetchItems(user);
        yield put(fetchItemsSuccess(fetchedReminders));
    } catch (error) {
        yield put(fetchItemsFailure(error));
    }
}

export function* deleteItemAsync(itemId){
    try {
        const fetchedReminders = yield REMINDERS_DATA;
        yield put(fetchItemsSuccess(fetchedReminders));
    } catch (error) {
        yield put(fetchItemsFailure(error));
    }
}

export function* addItemAsync({payload:{item, user}}){
    try {
        const docRefId = yield writeItems(user, item);
        yield put(addItemSuccess(docRefId, item));
    } catch (error) {
        yield put(addItemFailure(error));
    }
}

function* onFetchItemsStart() { 
    yield takeEvery(
       itemsActionTypes.FETCH_ITEMS_START, 
        fetchItemsAsync
    )
}

function* onDeleteItemStart() { 
    yield takeEvery(
       itemsActionTypes.DELETE_ITEM_START, 
        deleteItemAsync
    )
}

function* onAddItemStart() { 
    yield takeEvery(
       itemsActionTypes.ADD_ITEM_START, 
        addItemAsync
    )
}

export function* itemsSagas() {
    yield all([
        call(onFetchItemsStart),
        call(onDeleteItemStart),
        call(onAddItemStart)
    ]);
}