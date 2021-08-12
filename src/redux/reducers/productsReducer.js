/* eslint-disable import/no-anonymous-default-export */
import { CREATE_PRODUCT, FETCH_PRODUCTS } from '../actions/types';

const INITIAL_STATE = {
    products: [],
    successMessage: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CREATE_PRODUCT: 
            console.log(action.payload);
            return { ...state, successMessage: action.payload }
        default:
            return state;
    }
};