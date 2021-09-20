import React from 'react';
import { connect } from 'react-redux';

import { createProduct } from '../../redux/actions';
import ProductForm from '../../components/ProductForm/ProductForm';
import requireAuth from '../../hoc/requireAuth';
import './CreateProductPage.scss';

const CreateProductPage = props => {
    const onFormSubmit = formValues => {
        props.createProduct(formValues);
    };
    
    return (
        <section className='create-product'>
            <h3 className='create-product__title'>Create product</h3>
            <ProductForm onSubmit={onFormSubmit} errors={props.errors} productIsCreating={props.productIsCreating} />
        </section>
    );
};

const mapStateToProps = state => {
    return { 
        errors: state.products.errors,
        productIsCreating: state.products.productIsCreating
    };
};

const authCreateProdcutPage = requireAuth(CreateProductPage);

export default connect(mapStateToProps, { createProduct })(authCreateProdcutPage);