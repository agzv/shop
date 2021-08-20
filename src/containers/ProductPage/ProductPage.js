import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts, deleteProduct } from '../../redux/actions';

const ProductPage = props => {
    const { fetchProducts } = props;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const renderActionButtons = (productId) => {
        if(props.isLoggedIn) {
            return (
                <div className='actionBtns'>
                    <Link to={`/products/edit-product/${productId}`}>Edit</Link>
                    <button onClick={() => deleteProduct(productId)}>Delete</button>
                </div>
            );
        }
    };

    const deleteProduct = productId => {
        props.deleteProduct(productId);
    };

    const renderProducts = () => {
        if(!props.products) {
            return <div>Loading...</div>
        }

        return props.products.map(product => {
            return (
                <li key={product._id}>
                    {product.title}
                    {renderActionButtons(product._id)}
                </li>
            );
        })
    };

    return (
        <div>
            <h2>Products Page</h2>
            <ul>{renderProducts()}</ul>
        </div>
    );
};

const mapStateToProps = state => {
    return { 
        products: state.products.products,
        isLoggedIn: state.auth.adminUserId !== null
    };
};

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductPage);