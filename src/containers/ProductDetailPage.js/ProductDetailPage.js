import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProduct, addToCart, deleteProduct } from '../../redux/actions';
import Loader from '../../components/Loader/Loader';
import './ProductDetailPage.scss';

const ProductDetailPage = props => {
    const productId = props.match.params.productId;
    const { fetchProduct } = props;

    useEffect(() => {
        fetchProduct(productId);
    }, [productId, fetchProduct]);

    const renderProduct = () => {
        if(props.product) {
            return (
                <div className='product__detail'>
                    <img src={`http://localhost:3100/${props.product.imageUrl}`} alt={props.product.title} className='product__img'/>
                    <h3 className='product__title'>{props.product.title}</h3>
                    <p className='product__description'>{props.product.description}</p>
                    <h5 className='product__price'>$ {props.product.price}</h5>
                    <div className='product__buttons'>
                        {renderActionButtons(productId, props.product.creator)}
                        {props.isUserLoggedIn ? <button onClick={addToCart} className='btn'>Add To Cart</button> : null}
                        {!props.isAdminLoggedIn && !props.isUserLoggedIn ? <Link to='/auth/user-login' className='product__away-link'>Please login to buy this product</Link> : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />;
        }
    }

    const renderActionButtons = (productId, adminUserId) => {
        if(props.isAdminLoggedIn && adminUserId === props.currentAdminUserId) {
            return (
                <Fragment>
                    <Link to={`/products/edit-product/${productId}`} className='btn btn-edit'>Edit</Link>
                    <button onClick={() => deleteProduct(productId)} className='btn btn-delete'>Delete</button>
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

    return <section className='product'>{renderProduct()}</section>
};

const mapStateToProps = state => {
    return { 
        product: state.products.product,
        isAdminLoggedIn: state.auth.isLoggedIn,
        isUserLoggedIn: state.auth.isUserLoggedIn,
        currentAdminUserId: state.auth.adminUserId
    };
};

export default connect(mapStateToProps, { fetchProduct, addToCart, deleteProduct })(ProductDetailPage);