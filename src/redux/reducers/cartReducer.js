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
            return { ...state, cartProducts: action.payload };
        case actionTypes.REMOVE_FROM_CART:
            const updatedCartProducts = state.cartProducts.filter(cp => cp.productId._id !== action.payload.prodId);
            return { ...state, message: action.payload.message, cartProducts: updatedCartProducts };
        case actionTypes.CLEAR_CART:
            return { ...state, message: action.payload, cartProducts: [] };
        default:
            return state;
    }
};