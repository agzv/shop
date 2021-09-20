import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from './productsReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    form: formReducer
});