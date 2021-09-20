/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './ToggleButton.scss';

export default props => {
    return (
        <button onClick={props.handleClick} className="nav__button">
            <span className='nav__icon'>&nbsp;</span>
        </button>
    );
};