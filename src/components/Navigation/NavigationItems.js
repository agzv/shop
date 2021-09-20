import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/actions';
import NavigationItem from './NavigationItem/NavigationItem';
import ToggleButton from '../ToggleButton/ToggleButton';
import './NavigationItems.scss';

const NavigationItems = props => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = document.querySelectorAll('.nav__link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            setIsMenuOpen(!isMenuOpen);
        })
    })

    const renderHeaderLinks = () => {
        if(!props.isUserLoggedIn && !props.isAdminLoggedIn) {
            return (
                <Fragment>
                    <li className='nav__item'><NavigationItem path='/auth/user-signup' name='Sign Up' /></li>
                    <li className='nav__item'><NavigationItem path='/auth/user-login' name='Log In' /></li>
                </Fragment>
            );
        } else if(props.isAdminLoggedIn) {
            return <li className='nav__item'><NavigationItem path='/products/create-product' name='Create Product' /></li>
        } else {
            return (
                <Fragment>
                    <li className='nav__item'><NavigationItem  path='/cart' name='Cart' /></li>
                    <li className='nav__item'><NavigationItem path='/orders' name='Orders' /></li>
                    <button onClick={props.logoutUser} className='btn-logout'>Log Out</button>
                </Fragment>
            );
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`nav ${isMenuOpen ? 'open-nav' : ''}`}>
            <ToggleButton handleClick={toggleMenu} />
            <ul className={`nav__list ${isMenuOpen ? 'show-list' : ''}`}>
                <li className='nav__item'><NavigationItem path='/' name='Main' /></li>
                <li className='nav__item'><NavigationItem path='/products' name='Products' /></li>
                {renderHeaderLinks()}
            </ul>
        </nav>
    );
};

const mapStateToProps = state => {
    return { 
        isUserLoggedIn: state.auth.isUserLoggedIn,
        isAdminLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { logoutUser })(NavigationItems);