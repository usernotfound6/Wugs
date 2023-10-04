import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* getClient(action) {
  // get all client info from table here then send to reducer!

  try {
    console.log("payload is:", action.payload)
  }
  catch (error) {
    console.log("error with GET on client side", error)
  }

}

function* clientSaga() {
  yield takeLatest('FETCH_CLIENT', getClient)
}

export default clientSaga;