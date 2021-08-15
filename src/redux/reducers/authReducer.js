/* eslint-disable import/no-anonymous-default-export */
import { CREATE_ADMIN_USER } from '../actions/types';

const INITIAL_STATE = {
    adminUserId: '',
    userId: '',
    adminToken: '',
    userToken: '',
    message: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CREATE_ADMIN_USER:
            console.log(action.payload);
            return { ...state, adminUserId: action.payload.adminUserId, error: action.payload};
        default:
            return state; 
    }
};