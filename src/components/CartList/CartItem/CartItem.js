/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './CartItem.scss';

export default props => {
    const { quantity, productId: { _id, title, price } } = props.cartProduct;
    return (
        <li className='cart-list__item'>
            <h5 className='cart-list__title'>
                {title} <span className='cart-list__qty'>quantity: {quantity}</span> - <span className='cart-list__price'>price: ${price}</span>
            </h5>
            <button onClick={() => props.removeFromCart(_id)} className='btn btn-delete'>Remove from cart</button>
        </li>
    );
};