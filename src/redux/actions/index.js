import { FETCH_PRODUCTS, CREATE_PRODUCT } from './types';
import products from '../../utilities/products';

export const createProduct = (title, description, price) => {
    return async dispath => {
        const response = await products.post('/products/create-product', { title, description, price });
        dispath({ type: CREATE_PRODUCT, payload: response.data.message });
    };
};