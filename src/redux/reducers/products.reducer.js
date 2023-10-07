// import { combineReducers } from "redux";

const singleClient = (state = {}, action) => {
    if (action.type === 'SET_ALL_PRODUCTS') {
        return action.payload;
    }
    return state;
}

export default singleClient;