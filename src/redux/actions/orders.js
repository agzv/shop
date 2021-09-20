import * as actionTypes from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';

export const createOrder = () => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.post('/products/create-order', null, { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: actionTypes.CREATE_ORDER, payload: response.data });
        history.push('/orders');
    };
};

export const getOrders = () => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.get('/products/orders', { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: actionTypes.GET_ORDERS, payload: response.data.orders });
    };
};