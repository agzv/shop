import * as actionTypes from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';

export const addToCart = productId => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.post('/products/add-to-cart', { productId: productId }, { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: actionTypes.ADD_TO_CART, payload: response.data });
        history.push('/cart');
    };
};

export const getCart = () => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.get('/products/cart', { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: actionTypes.GET_CART, payload: response.data.cartProducts });
    };
};

export const removeFromCart = productId => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.post('/products/cart-delete-item', { productId: productId }, { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: { message: response.data, prodId: productId } });
    };
};

export const clearCart = () => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.post('/products/cart-clear', null, { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: actionTypes.CLEAR_CART, payload: response.data });
    };
};