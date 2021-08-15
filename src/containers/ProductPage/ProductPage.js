import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts, deleteProduct } from '../../redux/actions';

const ProductPage = props => {
    const { fetchProducts } = props;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

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
                    <div className='actionBtns'>
                        <Link to={`/products/edit-product/${product._id}`}>Edit</Link>
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
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
    return { products: state.products.products };
};

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductPage);