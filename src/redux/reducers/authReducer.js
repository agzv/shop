/* eslint-disable import/no-anonymous-default-export */
import { CREATE_ADMIN_USER, LOGIN_USER_ADMIN, LOGOUT_USER_ADMIN, CREATE_ADMIN_USER_FAILED, LOGIN_USER_ADMIN_FAILED } from '../actions/types';

const INITIAL_STATE = {
    adminUserId: null,
    userId: null,
    adminToken: null,
    userToken: null,
    message: null,
    error: null,
    isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CREATE_ADMIN_USER:
            return { ...state, message: action.payload.message };
        case CREATE_ADMIN_USER_FAILED:
            return { ...state, error: action.payload };
        case LOGIN_USER_ADMIN:
            return { ...state, adminUserId: action.payload.userId, adminToken: action.payload.token, isLoggedIn: true };
        case LOGIN_USER_ADMIN_FAILED:
            return { ...state, error: action.payload };
        case LOGOUT_USER_ADMIN:
            return { ...state, adminUserId: null, adminToken: null, isLoggedIn: false };
        default:
            return state;
    }
};