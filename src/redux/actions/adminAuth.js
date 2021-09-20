import * as actionTypes from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';
import { transformErrors } from '../../utilities/transformErrors';

export const createAdminUser = userData => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.CREATE_ADMIN_USER_START });
            const response = await axiosInstance.post('/auth/admin/create-admin-user', userData);
            dispatch({ type: actionTypes.CREATE_ADMIN_USER, payload: response.data });
            dispatch({ type: actionTypes.CREATE_ADMIN_USER_END });
            history.push('/admin/login');
        } catch(error) {
            if(error.response) {
                dispatch({ type: actionTypes.CREATE_ADMIN_USER_FAILED, payload: transformErrors(error) });
                dispatch({ type: actionTypes.CREATE_ADMIN_USER_END });
            }
        }
       
    };
};

export const loginAdminUser = (userData = null) => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.LOGIN_USER_ADMIN_START });
            const response = await axiosInstance.post('/auth/admin/login-admin-user', userData);
            localStorage.setItem('adminToken', response.data.adminToken);
            localStorage.setItem('adminUid', response.data.adminUserId);
            localStorage.setItem('adminExpirationDate', new Date().getTime() + (60 * 60 * 1000));
            dispatch({ type: actionTypes.LOGIN_USER_ADMIN, payload: response.data });
            dispatch({ type: actionTypes.LOGIN_USER_ADMIN_END });
            history.push('/products/create-product');
        } catch(error) {
            if(error.response) {
                dispatch({ type: actionTypes.LOGIN_USER_ADMIN_FAILED, payload: transformErrors(error) });
                dispatch({ type: actionTypes.LOGIN_USER_ADMIN_END });
            }
        }
        
    };
};

export const logoutAdminUser = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUid');
    localStorage.removeItem('adminExpirationDate');
    return { type: actionTypes.LOGOUT_USER_ADMIN };
};

// CHECK AUTH
export const authAutoLoginAdmin = actionType => {
    return dispatch => {
        const adminToken = localStorage.getItem('adminToken');
        if(!adminToken) {
            dispatch(logoutAdminUser());
        } else {
            const expirationDate = localStorage.getItem('adminExpirationDate');
            if(expirationDate <= new Date().getTime()){
                dispatch(logoutAdminUser());
            } else {
                const adminUserId = localStorage.getItem('adminUid');
                dispatch({ type: actionType, payload: { adminToken, adminUserId } });
                dispatch(checkAuthTimeout());
            }
        }
    };
};

export const checkAuthTimeout = () => {
    return dispatch => {
        const expirationDate = localStorage.getItem('adminExpirationDate');
        setTimeout(() => {
            dispatch(logoutAdminUser());
        }, expirationDate / 1000);
    };
};