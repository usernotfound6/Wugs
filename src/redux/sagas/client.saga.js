import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// get all Client's info from user table, client table, status, services, products
function* getClient(action) {
  try {
    const clientId = action.payload;
    // console.log('clientId is:', clientId)
    const response = yield axios.get(`/api/onboarding/client/${clientId}`);
    const clientInfo = response.data[0];
    // console.log("client's info in saga:", clientInfo)
    yield put({ type: 'SET_SINGLE_CLIENT', payload: clientInfo })
  }
  catch (error) {
    console.log("error with GET on client side", error)
  }
}

function* getAllClients(action) {
  try {
    const response = yield axios.get('/api/admin');
    const allClients = response.data;
    console.log("all clients' info in saga:", allClients)
    yield put({ type: 'SET_ALL_CLIENTS', payload: allClients })
  }
  catch (error) {
    console.log("error with GET on client side", error)
  }
}



function* clientSaga() {
  yield takeLatest('FETCH_CLIENT', getClient)
  yield takeLatest('FETCH_ALL_CLIENTS', getAllClients)
}

export default clientSaga;