import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//PETER: Deleted what I originally put here, but leaving this for now because we might need a client saga later anyways ?!?


function* updateServices(action) {
    // new client info here - sending PUT, no reducer needed

    try {
        const servicesObj = action.payload;
        console.log("client_id:", servicesObj.client_id)
        console.log("service_id array:", servicesObj.service_id)
        const response = yield axios.put('/api/onboarding/servicechoice', servicesObj)
        console.log(response.data)
        yield put({type: "FETCH_USER"});
    }
    catch (error) {
        console.log("error with PUT on client side", error)
    }
}

function* updateDemographics(action) {

    try {
        const servicesObj = action.payload;
        console.log("client_id:", servicesObj.client_id)
        console.log("demographic object:", servicesObj)
        const response = yield axios.put(`/api/onboarding/demographic/${servicesObj.client_id}`, servicesObj)
        console.log(response.data)
        yield put({type: "FETCH_USER"});

    }
    catch (error) {
        console.log("error with Demographic PUT on client side", error)
    }
}

function* updateAdditionalInfo(action) {

    try {
        const servicesObj = action.payload;
        console.log("client_id:", servicesObj.client_id)
        console.log("Additonal Info object:", servicesObj)
        const response = yield axios.put(`/api/onboarding/additionalinfo/${servicesObj.client_id}`, servicesObj)
        console.log(response.data)
    }
    catch (error) {
        console.log("error with Additional info PUT on client side", error)
    }
}

function* onboardingSaga() {
    yield takeLatest('UPDATE_SERVICES', updateServices)
    yield takeLatest('UPDATE_DEMOGRAPHICS', updateDemographics)
    yield takeLatest('UPDATE_ADDINFO', updateAdditionalInfo)
}

export default onboardingSaga;