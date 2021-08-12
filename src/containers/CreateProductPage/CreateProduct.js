import React from 'react';
import { connect } from 'react-redux';

import { createProduct } from '../../redux/actions';
import ProductForm from '../../components/ProductForm/ProductForm';

const CreateProductPage = props => {
    const onFormSubmit = (title, description, price) => {
        console.log(title, description, price);
        props.createProduct(title, description, price);
    };

    return <ProductForm onFormSubmit={onFormSubmit} />
};

export default connect(null, { createProduct })(CreateProductPage);