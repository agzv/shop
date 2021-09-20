/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    adminUserId: null,
    userId: null,
    adminToken: null,
    userToken: null,
    message: null,
    adminLoginFormErrors: null,
    adminSignupFormErrors: null,
    userLoginFormErrors: null,
    userSignupFormErrors: null,
    errors: null,
    isLoggedIn: false,
    isUserLoggedIn: false,
    isAuthenticating: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.CREATE_ADMIN_USER:
            return { ...state, message: action.payload.message };
        case actionTypes.CREATE_ADMIN_USER_FAILED:
            return { ...state, adminSignupFormErrors: action.payload };
        case actionTypes.CREATE_ADMIN_USER_START:
            return { ...state, isAuthenticating: true };
        case actionTypes.CREATE_ADMIN_USER_END:
            return { ...state, isAuthenticating: false };
        case actionTypes.LOGIN_USER_ADMIN:
            return { ...state, adminUserId: action.payload.adminUserId, adminToken: action.payload.adminToken, isLoggedIn: true };
        case actionTypes.LOGIN_USER_ADMIN_FAILED:
            return { ...state, adminLoginFormErrors: action.payload };
        case actionTypes.LOGIN_USER_ADMIN_START:
            return { ...state, isAuthenticating: true };
        case actionTypes.LOGIN_USER_ADMIN_END:
            return { ...state, isAuthenticating: false };
        case actionTypes.LOGOUT_USER_ADMIN:
            return { ...state, adminUserId: null, adminToken: null, isLoggedIn: false };
        case actionTypes.CREATE_USER:
            return { ...state, message: action.payload.message };
        case actionTypes.CREATE_USER_FAILED:
            return { ...state, userSignupFormErrors: action.payload };
        case actionTypes.CREATE_USER_START:
            return { ...state, isAuthenticating: true };
        case actionTypes.CREATE_USER_END:
            return { ...state, isAuthenticating: false };
        case actionTypes.LOGIN_USER:
            return { ...state, userId: action.payload.userId, userToken: action.payload.token, isUserLoggedIn: true };
        case actionTypes.LOGIN_USER_FAILED:
            return { ...state, userLoginFormErrors: action.payload };
        case actionTypes.LOGIN_USER_START: 
            return { ...state, isAuthenticating: true };
        case actionTypes.LOGIN_USER_END:
            return { ...state, isAuthenticating: false };
        case actionTypes.LOGOUT_USER:
            return { ...state, userId: null, userToken: null, isUserLoggedIn: false }; 
        default:
            return state;
    }
};