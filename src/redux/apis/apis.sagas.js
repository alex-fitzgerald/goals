import { takeEvery, call, put, all } from "@redux-saga/core/effects";
import { getRandomNumber } from "../../app.utils";
import axios from "axios";
import { fetchFailure, fetchStoicismSuccess } from "./apis.actions";
import { fetchApi } from "./apis.utils";

import { apisActionTypes } from "./apis.types";

export function* fetchStoicismAsync(){
    const stoicUrl = "https://stoicquotesapi.com/v1/api/quotes/random";
    try {
        const { author, body } = yield call(fetchApi);
        yield put(fetchStoicismSuccess(author, body));
    } catch (error) {
        yield put(fetchFailure(error));
    }
}

function* onFetchStoicismStart() { 
    yield takeEvery(
        apisActionTypes.FETCH_STOICISM_START, 
        fetchStoicismAsync
    )
}

export function* apisSagas() {
    yield all([
        call(onFetchStoicismStart)
    ]);
}