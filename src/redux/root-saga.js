import { apisSagas } from "./apis/apis.sagas";
import { itemsSagas } from "./items/items.sagas";
import { all, call } from "@redux-saga/core/effects";

export default function* rootSaga() {
    yield all([
        call(apisSagas),
        call(itemsSagas)
    ]);
}