import React from 'react';
import { connect } from 'react-redux';

import { createProduct } from '../../redux/actions';
import ProductForm from '../../components/ProductForm/ProductForm';

const CreateProductPage = props => {
    const onFormSubmit = product => {
        props.createProduct(product);
    };

    return <ProductForm onSubmit={onFormSubmit} />
};

export default connect(null, { createProduct })(CreateProductPage);