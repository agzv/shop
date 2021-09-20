import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCart } from '../../redux/actions';
import CartList from '../../components/CartList/CartList';
import './CartPage.scss';

const CartPage = props => {
    const { getCart, cartProducts } = props;

    useEffect(() => {
        getCart()
    }, [getCart]);

    const renderCartProducts = () => {
        if(!cartProducts.length) {
            return <h1 className='heading-primary'>Your cart is empty</h1>
        } else {
            return <CartList cartProducts={cartProducts} />
        }
    };

    return (
        <section className='cart'>
            {renderCartProducts()}
        </section>
    );
};

const mapStateToProps = state => {
    return { cartProducts: state.cart.cartProducts };
};

export default connect(mapStateToProps, { getCart })(CartPage);