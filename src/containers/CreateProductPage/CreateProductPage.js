import React from 'react';
import { connect } from 'react-redux';

import { createProduct } from '../../redux/actions';
import ProductForm from '../../components/ProductForm/ProductForm';
import requireAuth from '../../hoc/requireAuth';

const CreateProductPage = props => {
    const onFormSubmit = product => {
        props.createProduct(product);
    };

    return <ProductForm onSubmit={onFormSubmit} />
};

const authCreateProdcutPage = requireAuth(CreateProductPage);

export default connect(null, { createProduct })(authCreateProdcutPage);