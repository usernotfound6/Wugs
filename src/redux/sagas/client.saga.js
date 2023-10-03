import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//PETER: Deleted what I originally put here, but leaving this for now because we might need a client saga later anyways ?!?


function* getClient() {
// get all client info from table here then send to reducer!
}

function* clientSaga() {
  yield takeLatest('FETCH_CLIENT', getClient)
}

export default clientSaga;