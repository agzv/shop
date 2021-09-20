import React from 'react';

import OrderItem from './OrderItem/OrderItem';
import './OrderList.scss';

const OrderList = props => {
    return (
        <ul className='orders-list'>
            {props.orders.map(order => {
                return <OrderItem key={order._id} order={order} />
            })}
        </ul>
    )
};

export default OrderList;