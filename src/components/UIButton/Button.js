import React from 'react';

const Button = props => {
    const handleClick = () => {
        props.onButtonClick()
    };

    return <button className={`btn ${props.modifier}`} onClick={handleClick}>{props.title}</button>
};

export default Button;