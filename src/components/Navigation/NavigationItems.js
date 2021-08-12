import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <div>
            <NavigationItem path='/' name='Main Page' />
            <NavigationItem path='/products' name='Products' />
            <NavigationItem path='/products/create-product' name='Create Product' />
        </div>
    );
};

export default NavigationItems;