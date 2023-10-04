import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* getClient(action) {
  // get all client info from table here then send to reducer!

  try {
    const clientId = action.payload;
    console.log('clientId is:', clientId)
    const response = yield axios.get(`/api/onboarding/client/${clientId}`);
    const clientInfo = response.data[0];
    console.log("client's info in saga:", clientInfo)

    yield put({ type: 'SET_SINGLE_CLIENT',  payload: clientInfo})

  }
  catch (error) {
    console.log("error with GET on client side", error)
  }

}

function* clientSaga() {
  yield takeLatest('FETCH_CLIENT', getClient)
}

export default clientSaga;