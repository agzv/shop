import { 
    FETCH_PRODUCTS, 
    FETCH_PRODUCT, 
    CREATE_PRODUCT, 
    EDIT_PRODUCT, 
    CREATE_ADMIN_USER, 
    LOGIN_USER_ADMIN, 
    LOGOUT_USER_ADMIN, 
    CREATE_ADMIN_USER_FAILED,
    LOGIN_USER_ADMIN_FAILED
} from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';

export const fetchProducts = () => {
    return async dispatch => {
        const response = await axiosInstance.get('/products');
        dispatch({ type: FETCH_PRODUCTS, payload: response.data.products });
    };
};

export const fetchProduct = productId => {
    return async dispatch => {
        const response = await axiosInstance.get(`/products/${productId}`);
        dispatch({ type: FETCH_PRODUCT, payload: response.data.product });
    };
};

export const editProduct = (productId, updatedProduct) => {
    return async (dispatch, getState) => {
        const adminToken = getState().auth.adminToken;
        const response = await axiosInstance.patch(`/products/${productId}`, updatedProduct, { headers: { Authorization: `Bearer ${adminToken}` } });
        dispatch({ type:  EDIT_PRODUCT, payload: response.data});
    };
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const adminToken = getState().auth.adminToken;
        const response = await axiosInstance.delete(`/products/${productId}`, { headers: { Authorization: `Bearer ${adminToken}` } });
        console.log(response);
    };
};

export const createProduct = product => {
    return async (dispatch, getState) => {
        const adminToken = getState().auth.adminToken;
        console.log(adminToken);
        const response = await axiosInstance.post('/products/create-product', product, { headers: { Authorization: `Bearer ${adminToken}` } });
        dispatch({ type: CREATE_PRODUCT, payload: response.data.message });
        history.push('/products');
    };
};

// AUTH
export const createAdminUser = userData => {
    return async dispatch => {
        try {
            console.log(userData);
            const response = await axiosInstance.post('/auth/admin/create-admin-user', userData);
            dispatch({ type: CREATE_ADMIN_USER, payload: response.data });
            history.push('/auth/admin-login');
        } catch(error) {
            if(error.response) {
                dispatch({ type: CREATE_ADMIN_USER_FAILED, payload: error.response.data.error });
                console.log(error.response.data);
            }
        }
       
    };
};

export const loginAdminUser = (userData = null) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/auth/admin/login-admin-user', userData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('uid', response.data.userId);
            localStorage.setItem('expirationDate', new Date().getTime() + (60 * 60 * 1000));
            dispatch({ type: LOGIN_USER_ADMIN, payload: response.data });
            history.push('/products/create-product');
        } catch(error) {
            if(error.response) {
                dispatch({ type: LOGIN_USER_ADMIN_FAILED, payload: error.response.data.error });
            }
        }
        
    }
};

export const logoutAdminUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('expirationDate');
    return { type: LOGOUT_USER_ADMIN };
};

export const authAutoLogin = () => {
    return dispatch => {
        const adminToken = localStorage.getItem('token');
        if(!adminToken) {
            dispatch(logoutAdminUser());
        } else {
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate <= new Date().getTime()){
                dispatch(logoutAdminUser());
            } else {
                const adminUserId = localStorage.getItem('uid');
                dispatch({ type: LOGIN_USER_ADMIN, payload: { adminToken, adminUserId } });
                dispatch(checkAuthTimeout());
            }
        }
    }
}

export const checkAuthTimeout = () => {
    return dispatch => {
        const expirationDate = localStorage.getItem('expirationDate');
        setTimeout(() => {
            dispatch(logoutAdminUser());
        }, expirationDate);
    }
};