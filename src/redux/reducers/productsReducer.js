/* eslint-disable import/no-anonymous-default-export */
import { CREATE_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
    products: [],
    product: {},
    successMessage: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return { ...state, products: action.payload };
        case FETCH_PRODUCT:
            return { ...state, product: action.payload };
        case CREATE_PRODUCT: 
            console.log(action.payload);
            return { ...state, successMessage: action.payload };
        default:
            return state;
    }
};