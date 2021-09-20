import React from 'react';
import { Link } from 'react-router-dom';

import './MainPage.scss';
import '../../scss/general.scss';

const MainPage = () => {
    return (
        <div className='main'>
            <div className='main__banner'>
                <h1>Welcome to Amazing Online Shop</h1>
                <h4>You can find here everything you need</h4>
                <Link to='/products' className='btn'>Let's see what we have</Link>
            </div>
        </div>
    );
};

export default MainPage;