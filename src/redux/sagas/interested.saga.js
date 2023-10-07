import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* interestedInWugs(action) {
    try {
        const getMoreInfoObject = action.payload;
        console.log("getMoreInfoObject:", getMoreInfoObject)
        const response = yield axios.post("/api/interested", getMoreInfoObject)
        console.log("success with interested party POST:", response.data)
    }
    catch (error) {
        console.log("error with PUT on client side", error)
    }
}

function* interestedSaga() {
    yield takeLatest('NEW_INTERESTED', interestedInWugs);
}

export default interestedSaga;