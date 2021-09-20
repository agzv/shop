/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    products: [],
    product: {},
    totalItems: 0,
    message: '',
    errors: null,
    productIsCreating: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return { ...state, products: action.payload.products, totalItems: action.payload.totalItems };
        case actionTypes.FETCH_PRODUCT:
            return { ...state, product: action.payload };
        case actionTypes.CREATE_PRODUCT: 
            return { ...state, message: action.payload };
        case actionTypes.CREATE_PRODUCT_FAILED:
            return { ...state, errors: action.payload };
        case actionTypes.CREATE_PRODUCT_START:
            return { ...state, productIsCreating: true };
        case actionTypes.CREATE_PRODUCT_END:
            return { ...state, productIsCreating: false };
        case actionTypes.EDIT_PRODUCT:
            return { ...state, message: action.payload };
        case actionTypes.EDIT_PRODUCT_FAILED:
            return { ...state, errors: action.payload };
        case actionTypes.DELETE_PRODUCT:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};