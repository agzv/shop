import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
    return <NavLink to={props.path}>{props.name}</NavLink>;
};

export default NavigationItem;