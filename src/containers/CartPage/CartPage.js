import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCart } from '../../redux/actions';
import CartList from '../../components/CartList/CartList';

const CartPage = props => {
    const { getCart, cartProducts } = props;

    useEffect(() => {
        if(!cartProducts.length) {
            getCart();
        }
    }, [getCart, cartProducts]);

    const renderCartProducts = () => {
        if(!cartProducts) {
            return <h1>Your cart is empty</h1>
        } else {
            return <CartList cartProducts={cartProducts} />
        }
    };

    return (
        <div>
            {renderCartProducts()}
        </div>
    );
};

const mapStateToProps = state => {
    return { cartProducts: state.cart.cartProducts };
};

export default connect(mapStateToProps, { getCart })(CartPage);