import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts, deleteProduct } from '../../redux/actions';

const ProductPage = props => {
    const { fetchProducts } = props;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // const renderActionButtons = (productId, adminUserId) => {
    //     if(props.isLoggedIn && adminUserId === props.currentAdminUserId) {
    //         return (
    //             <div className='actionBtns'>
    //                 <Link to={`/products/edit-product/${productId}`}>Edit</Link>
    //                 <button onClick={() => deleteProduct(productId)}>Delete</button>
    //             </div>
    //         );
    //     }
    // };

    // const deleteProduct = productId => {
    //     props.deleteProduct(productId);
    // };

    const renderProducts = () => {
        if(!props.products) {
            return <div>Loading...</div>
        }

        return props.products.map(product => {
            return (
                <Link key={product._id} to={`/products/product-detail/${product._id}`}>
                    <li>
                        {product.title}
                        {/* {renderActionButtons(product._id, product.creator)} */}
                    </li>
                </Link>
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
        isLoggedIn: state.auth.isLoggedIn,
        currentAdminUserId: state.auth.adminUserId
    };
};

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductPage);