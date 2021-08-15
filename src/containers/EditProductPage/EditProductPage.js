import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProduct, editProduct } from '../../redux/actions';
import ProductForm from '../../components/ProductForm/ProductForm';

const EditProductPage = props => {
    const productId = props.match.params.productId;
    const { fetchProduct } = props;

    useEffect(() => {
        fetchProduct(productId);
    }, [productId, fetchProduct]);

    const renderProduct = () => {
        if(!props.product.title) {
            return <div>Loading...</div>;
        }
        console.log(props.product);
        
        return (
            <div>
                <h3>Edit Product</h3>
                <ProductForm initialValues={props.product} />
            </div>
        );
    };

    return renderProduct();
};

const mapStateToProps = state => {
    return { product: state.products.product };
};

export default connect(mapStateToProps, { fetchProduct, editProduct })(EditProductPage);