import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//PETER: Deleted what I originally put here, but leaving this for now because we might need a client saga later anyways ?!?


function* getClient(action) {
// get all client info from table here then send to reducer!

// TODO : need to figure out how we're going to fetch user's client info.  Through the original user fetch (add a join for the manager id to get that client id?), or do we need to  tie the user id to the manager id a different way? 
// ---- how are we going to get the client's info right off the bat?

}

function* clientSaga() {
  yield takeLatest('FETCH_CLIENT', getClient)
}

export default clientSaga;