import * as actionTypes from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';
import { transformErrors } from '../../utilities/transformErrors';

export const createUser = userData => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START });
            const response = await axiosInstance.post('/auth/user/create-user', userData);
            dispatch({ type: actionTypes.CREATE_USER, payload: response.data });
            dispatch({ type: actionTypes.CREATE_USER_END });
            history.push('/auth/user-login');
        } catch(error) {
            if(error.response) {
                dispatch({ type: actionTypes.CREATE_USER_FAILED, payload: transformErrors(error) });
                dispatch({ type: actionTypes.CREATE_USER_END });
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.LOGIN_USER_START });
            const response = await axiosInstance.post('/auth/user/login-user', userData);
            localStorage.setItem('uid', response.data.userId);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', new Date().getTime() + (60 * 60 * 1000));
            dispatch({ type: actionTypes.LOGIN_USER, payload: response.data });
            dispatch({ type: actionTypes.LOGIN_USER_END });
            history.push('/products');
        } catch(error) {
            if(error.response) {
                dispatch({ type: actionTypes.LOGIN_USER_FAILED, payload: transformErrors(error) });
                dispatch({ type: actionTypes.CREATE_USER_END });
            };
        };
    };
};

export const logoutUser = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    history.push('/');
    return { type: actionTypes.LOGOUT_USER };
};

// CHECK AUTH
export const authAutoLogin = actionType => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logoutUser());
        } else {
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate <= new Date().getTime()){
                dispatch(logoutUser());
            } else {
                const userId = localStorage.getItem('uid');
                dispatch({ type: actionType, payload: { token, userId } });
                dispatch(checkAuthTimeout());
            }
        }
    };
};

export const checkAuthTimeout = () => {
    return dispatch => {
        const expirationDate = localStorage.getItem('expirationDate');
        setTimeout(() => {
            dispatch(logoutUser());
        }, expirationDate / 1000);
    };
};