/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const INITIAL_STATE = { 
    cartProducts: [],
    message: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            return { ...state, message: action.payload };
        case actionTypes.GET_CART:
            return { ...state, cartProducts: state.cartProducts.concat(action.payload) }
        default:
            return state;
    }
};