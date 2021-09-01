import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProduct, addToCart } from '../../redux/actions';

const ProductDetailPage = props => {
    const productId = props.match.params.productId;
    const { fetchProduct } = props;

    useEffect(() => {
        fetchProduct(productId);
    }, [productId, fetchProduct]);

    const renderProduct = () => {
        return (
            <div>
                <img src={`http://localhost:3100/${props.product.imageUrl}`} alt={props.product.title}/>
                <h3>{props.product.title}</h3>
                <p>{props.product.description}</p>
                <h5>{props.product.price}</h5>
                <div className='actionBtns'>
                    {renderActionButtons(productId, props.product.creator)}
                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
        );
    }

    const renderActionButtons = (productId, adminUserId) => {
        if(props.isLoggedIn && adminUserId === props.currentAdminUserId) {
            return (
                <Fragment>
                    <Link to={`/products/edit-product/${productId}`}>Edit</Link>
                    <button onClick={() => deleteProduct(productId)}>Delete</button>
                </Fragment>
            );
        }
    };

    const addToCart = () => {
        props.addToCart(productId);
    };

    const deleteProduct = productId => {
        props.deleteProduct(productId);
    };

    return renderProduct();
};

const mapStateToProps = state => {
    return { 
        product: state.products.product,
        isLoggedIn: state.auth.isLoggedIn,
        currentAdminUserId: state.auth.adminUserId
    };
};

export default connect(mapStateToProps, { fetchProduct, addToCart })(ProductDetailPage);