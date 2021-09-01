/* eslint-disable import/no-anonymous-default-export */
import { CREATE_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
    products: [],
    product: {},
    message: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return { ...state, products: action.payload };
        case FETCH_PRODUCT:
            return { ...state, product: action.payload };
        case CREATE_PRODUCT: 
            return { ...state, message: action.payload };
        case EDIT_PRODUCT:
            return { ...state, message: action.payload };
        case DELETE_PRODUCT:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};