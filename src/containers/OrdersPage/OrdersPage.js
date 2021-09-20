import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getOrders } from '../../redux/actions';
import OrderList from '../../components/OrderList/OrderList';
import './OrdersPage.scss';

const OrdersPage = props => {
    const { getOrders, orders } = props;

    useEffect(() => {
        getOrders()
    }, [getOrders]);

    const renderOrders = () => {
        if(!orders.length) {
            return <h1 className='heading-primary'>You don't have any orders</h1>;
        } else {
            return <OrderList orders={orders} />
        }
    };

    return <section className='orders'>{renderOrders()}</section>
};

const mapStateToProps = state => {
    return { orders: state.orders.orders };
};

export default connect(mapStateToProps, { getOrders })(OrdersPage);