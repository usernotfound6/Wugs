import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//PETER: Deleted what I originally put here, but leaving this for now because we might need a client saga later anyways ?!?


function* updateServices(action) {
    // new client info here - sending PUT, no reducer needed

    try {
        const servicesArray = action.payload;
        console.log("servicesArray:", servicesArray)
        console.log(user.id)
        const response = yield axios.put('/api/onboarding', servicesArray)
        console.log(response.data)

    }
    catch (error) {
        console.log("error with PUT on client side", error)
    }
}

function* onboardingSaga() {
    yield takeLatest('UPDATE_SERVICES', updateServices)
}

export default onboardingSaga;