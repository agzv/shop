import { FETCH_PRODUCTS, FETCH_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, CREATE_ADMIN_USER } from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';

export const fetchProducts = () => {
    return async dispath => {
        const response = await axiosInstance.get('/products');
        dispath({ type: FETCH_PRODUCTS, payload: response.data.products });
    };
};

export const fetchProduct = productId => {
    return async dispath => {
        const response = await axiosInstance.get(`/products/${productId}`);
        dispath({ type: FETCH_PRODUCT, payload: response.data.product });
    };
};

export const editProduct = (productId, updatedProduct) => {
    return async dispath => {
        const response = await axiosInstance.patch(`/products/${productId}`, updatedProduct);
        dispath({ type:  EDIT_PRODUCT, payload: response.data});
    };
};

export const deleteProduct = productId => {
    return async dispath => {
        const response = await axiosInstance.delete(`/products/${productId}`);
        console.log(response);
    };
};

export const createProduct = product => {
    return async dispath => {
        const response = await axiosInstance.post('/products/create-product', product);
        dispath({ type: CREATE_PRODUCT, payload: response.data.message });
        history.push('/products');
    };
};

// AUTH
export const createAdminUser = userData => {
    return async dispath => {
        const response = await axiosInstance.post('/auth/admin/create-admin-user', userData);
        console.log(response);
        dispath({ type: CREATE_ADMIN_USER, payload: response.data });
    };
};