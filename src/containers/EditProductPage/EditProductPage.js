import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProduct, editProduct } from '../../redux/actions';
import ProductForm from '../../components/ProductForm/ProductForm';
import requireAuth from '../../hoc/requireAuth';
import './EditProductPage.scss';

const EditProductPage = props => {
    const productId = props.match.params.productId;
    const { fetchProduct } = props;

    useEffect(() => {
        fetchProduct(productId);
    }, [productId, fetchProduct]);

    const onFormSubmit = formValues => {
        props.editProduct(productId, formValues);
    };

    const renderProduct = () => {
        if(!props.product) {
            return <div>Loading...</div>;
        }
        
        return <ProductForm initialValues={props.product} onSubmit={onFormSubmit} errors={props.errors} productIsCreating={props.productIsCreating} />
    };

    return (
        <section className='edit-product'>
            <h3 className='edit-product__title'>Edit product</h3>
            {renderProduct()}
        </section>
    )
};

const mapStateToProps = state => {
    return { 
        product: state.products.product,
        errors: state.products.errors,
        productIsCreating: state.products.productIsCreating
    };
};

const authEditProductPage = requireAuth(EditProductPage);

export default connect(mapStateToProps, { fetchProduct, editProduct })(authEditProductPage);