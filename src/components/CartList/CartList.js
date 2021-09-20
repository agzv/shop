import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { removeFromCart, clearCart, createOrder } from '../../redux/actions';
import CartItem from './CartItem/CartItem';
import Button from '../UIButton/Button';
import './CartList.scss';

const CartList = props => {
    const createOrder = () => {
        props.createOrder();
    };

    const removeFromCart = productId => {
        props.removeFromCart(productId);
    };

    const clearCart = () => {
        props.clearCart();
    };

    return (
        <Fragment>
            <ul className='cart-list'>
                {props.cartProducts.map(cartProduct => {
                    return <CartItem key={cartProduct.productId._id} cartProduct={cartProduct} removeFromCart={removeFromCart} />;
                })}
            </ul>
            
            <div className='cart-list__buttons'>
                <Button title='Order Now' onButtonClick={createOrder} />
                <Button title='Clear cart' onButtonClick={clearCart} modifier='btn-delete' />
            </div>
        </Fragment>
    );
};

export default connect(null, { removeFromCart, clearCart, createOrder })(CartList);