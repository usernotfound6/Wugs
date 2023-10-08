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
        const demographicObj = action.payload;
        console.log("client_id:", demographicObj.client_id)
        console.log("demographic object:", demographicObj)
        const response = yield axios.put(`/api/onboarding/demographic/${demographicObj.client_id}`, demographicObj)
        console.log(response.data)
        yield put({type: "FETCH_USER"});

    }
    catch (error) {
        console.log("error with Demographic PUT on client side", error)
    }
}

function* updateAdditionalInfo(action) {

    try {
        const additionalInfoObj = action.payload;
        console.log("client_id:", additionalInfoObj.client_id)
        console.log("Additonal Info object:", additionalInfoObj)
        const response = yield axios.put(`/api/onboarding/additionalinfo/${additionalInfoObj.client_id}`, additionalInfoObj)
        console.log(response.data)
    }
    catch (error) {
        console.log("error with Additional info PUT on client side", error)
    }
}

function* updateClientLocation(action) {

    try {
        const clientLocationObj = action.payload;
        const id = clientLocationObj.clientLocationInfoObject.client_id
        console.log("ClientLocation object:", clientLocationObj)
        console.log("ID", id)
        const response = yield axios.put(`/api/onboarding/clientlocationinfo/${id}`, clientLocationObj)
        console.log(response.data)
    }
    catch (error) {
        console.log("error with updateClientLocation PUT on client side", error)
    }
}

function* updateFoodPreferences(action) {

    try {
        const foodPreferencesObj = action.payload;
        const id = foodPreferencesObj.client_id
        console.log("FoodPreferences object:", foodPreferencesObj)
        console.log("ID", id)
        const response = yield axios.post(`/api/onboarding/foodpreferences/`, foodPreferencesObj)
        console.log("Respomnse",response.data)
    }
    catch (error) {
        console.log("error with updateFoodPreferences PUT on client side", error)
    }
}

function* onboardingSaga() {
    yield takeLatest('UPDATE_SERVICES', updateServices)
    yield takeLatest('UPDATE_DEMOGRAPHICS', updateDemographics)
    yield takeLatest('UPDATE_CLIENT_LOCATION', updateClientLocation)
    yield takeLatest('UPDATE_ADDINFO', updateAdditionalInfo)
    yield takeLatest('UPDATE_FOOD_PREFERENCES', updateFoodPreferences)
}

export default onboardingSaga;