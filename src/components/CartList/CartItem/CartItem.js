/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default props => {
    return <li>{props.title} quantity: {props.quantity}</li>;
};