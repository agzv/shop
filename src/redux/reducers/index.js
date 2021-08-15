import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from './productsReducer';
import authReducer from './authReducer';

export default combineReducers({
    products: productsReducer,
    auth: authReducer,
    form: formReducer
});