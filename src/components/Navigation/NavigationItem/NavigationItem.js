import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
    return <NavLink className="nav__link" to={props.path}>{props.name}</NavLink>;
};

export default NavigationItem;