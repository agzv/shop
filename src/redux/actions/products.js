import * as actionTypes from './types';
import axiosInstance from '../../utilities/axiosInstance';
import history from '../../utilities/history';
import { transformErrors } from '../../utilities/transformErrors';

export const fetchProducts = page => {
    return async dispatch => {
        const response = await axiosInstance.get(`/products?page=${page}`);
        dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: { products: response.data.products, totalItems: response.data.totalItems } });
    };
};

export const fetchProduct = productId => {
    return async dispatch => {
        const response = await axiosInstance.get(`/products/${productId}`);
        dispatch({ type: actionTypes.FETCH_PRODUCT, payload: response.data.product });
    };
};

export const editProduct = (productId, updatedProduct) => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.CREATE_PRODUCT_START });
            const adminToken = localStorage.getItem('adminToken');
            const formData = new FormData();
            formData.append('title', updatedProduct.title);
            formData.append('description', updatedProduct.description);
            formData.append('price', updatedProduct.price);
            formData.append('image', updatedProduct.image);
            formData.append('category', updatedProduct.category);
            const response = await axiosInstance.patch(`/products/${productId}`, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            dispatch({ type:  actionTypes.EDIT_PRODUCT, payload: response.data});
            dispatch({ type: actionTypes.CREATE_PRODUCT_END });
            history.push('/products');
        } catch(error) {
            if(error.response) {
                dispatch({ type: actionTypes.EDIT_PRODUCT_FAILED, payload: transformErrors(error) });
                dispatch({ type: actionTypes.CREATE_PRODUCT_END });
            }
        }
    };
};

export const deleteProduct = productId => {
    return async dispatch => {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axiosInstance.delete(`/products/${productId}`, { headers: { Authorization: `Bearer ${adminToken}` } });
        dispatch({ type: actionTypes.DELETE_PRODUCT, payload: response.data.message });
        history.push('/products');
    };
};

export const createProduct = product => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.CREATE_PRODUCT_START });
            const adminToken = localStorage.getItem('adminToken');
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('image', product.image);
            formData.append('category', product.category);
            const response = await axiosInstance.post('/products/create-product', formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            dispatch({ type:  actionTypes.CREATE_PRODUCT, payload: response.data.message});
            dispatch({ type: actionTypes.CREATE_PRODUCT_END });
            history.push('/products');
        } catch(error) {
            if(error.response) {
                dispatch({ type: actionTypes.CREATE_PRODUCT_FAILED, payload: transformErrors(error) });
                dispatch({ type: actionTypes.CREATE_PRODUCT_END });
            }
        }
    };
};