/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default props => {
    return (
        <li className='orders-list__item'>
            <h5 className='orders-list__title'>Your order ID</h5>
            <span className='orders-list__id'>{props.order._id}</span>
        </li>
    );
};