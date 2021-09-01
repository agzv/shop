import React, { Fragment } from 'react';

import CartItem from './CartItem/CartItem';
import Button from '../UIButton/Button';

const CartList = props => {
    const onButtonClick = () => {
        console.log('Ordered');
    };

    return (
        <Fragment>
            <ul>
                {props.cartProducts.map(cartProduct => {
                    return <CartItem key={cartProduct.productId._id} title={cartProduct.productId.title} quantity={cartProduct.quantity} />;
                })}
            </ul>
            <Button title='Order Now' onButtonClick={onButtonClick} />
        </Fragment>
    );
};

export default CartList;