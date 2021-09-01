import { 
    FETCH_PRODUCTS, 
    FETCH_PRODUCT, 
    CREATE_PRODUCT, 
    EDIT_PRODUCT,
    DELETE_PRODUCT, 
    CREATE_ADMIN_USER, 
    LOGIN_USER_ADMIN, 
    LOGOUT_USER_ADMIN, 
    CREATE_ADMIN_USER_FAILED,
    LOGIN_USER_ADMIN_FAILED,
    CREATE_USER,
    CREATE_USER_FAILED,
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART
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
    return async dispatch => {
        const adminToken = localStorage.getItem('token');
        const response = await axiosInstance.patch(`/products/${productId}`, updatedProduct, { headers: { Authorization: `Bearer ${adminToken}` } });
        dispatch({ type:  EDIT_PRODUCT, payload: response.data});
    };
};

export const deleteProduct = productId => {
    return async dispatch => {
        const adminToken = localStorage.getItem('token');
        const response = await axiosInstance.delete(`/products/${productId}`, { headers: { Authorization: `Bearer ${adminToken}` } });
        dispatch({ type: DELETE_PRODUCT, payload: response.data.message })
    };
};

export const createProduct = product => {
    return async dispatch => {
        const adminToken = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', product.image);
        const response = await axiosInstance.post('/products/create-product', formData, { headers: { Authorization: `Bearer ${adminToken}` } });
        dispatch({ type: CREATE_PRODUCT, payload: response.data.message });
        history.push('/products');
    };
};

export const addToCart = productId => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.post('/products/add-to-cart', { productId: productId }, { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: ADD_TO_CART, payload: response.data });
    };
};

export const getCart = () => {
    return async dispatch => {
        const userToken = localStorage.getItem('token');
        const response = await axiosInstance.get('/products/cart', { headers: { Authorization: `Bearer ${userToken}` } });
        dispatch({ type: GET_CART, payload: response.data.cartProducts });
    };
};

// AUTH ADMIN
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
        
    };
};

export const logoutAdminUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('expirationDate');
    return { type: LOGOUT_USER_ADMIN };
};

// AUTH USER
export const createUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/auth/user/create-user', userData);
            dispatch({ type: CREATE_USER, payload: response.data });
        } catch(error) {
            if(error.response) {
                dispatch({ type: CREATE_USER_FAILED, payload: error.response.data.error });
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/auth/user/login-user', userData);
            localStorage.setItem('uid', response.data.userId);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', new Date().getTime() + (60 * 60 * 1000));
            console.log(response.data);
            dispatch({ type: LOGIN_USER, payload: response.data });
            history.push('/products');
        } catch(error) {
            if(error.response) {
                dispatch({ type: LOGIN_USER_FAILED, payload: error.response.data.error });
            };
        };
    };
};

export const logoutUser = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return { type: LOGOUT_USER };
};

// CHECK AUTH
export const authAutoLogin = actionType => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logoutAdminUser());
        } else {
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate <= new Date().getTime()){
                dispatch(logoutAdminUser());
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
            dispatch(logoutAdminUser());
        }, expirationDate / 1000);
    };
};