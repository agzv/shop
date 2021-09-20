/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    orders: [],
    message: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.CREATE_ORDER:
            return { ...state, message: action.payload };
        case actionTypes.GET_ORDERS:
            return { ...state, orders: action.payload };
        default:
            return state;
    }
};