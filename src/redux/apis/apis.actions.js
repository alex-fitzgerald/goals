import { apisActionTypes } from "./apis.types";

export const fetchStoicismStart = () => ({
    type: apisActionTypes.FETCH_STOICISM_START
});

export const fetchStoicismSuccess = (content, author) => ({
    type: apisActionTypes.FETCH_STOICISM_SUCCESS,
    payload: {content:content, author:author}
});

export const fetchPhilosophyStart = () => ({
    type: apisActionTypes.FETCH_PHILOSOPHY_START
});

export const fetchPhilosophySuccess = () => ({
    type: apisActionTypes.FETCH_PHILOSOPHY_SUCCESS
});

export const fetchFailure = errorMessage => ({
    type: apisActionTypes.FETCH_FAILURE,
    payload: errorMessage
});
