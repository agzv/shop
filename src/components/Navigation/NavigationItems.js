import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/actions';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {

    const renderHeaderLinks = () => {
        if(!props.isUserLoggedIn) {
            return (
                <Fragment>
                    <NavigationItem path='/' name='Main Page' />
                    <NavigationItem path='/products' name='Products' />
                    <NavigationItem path='/auth/user-signup' name='Sign Up' />
                    <NavigationItem path='/auth/user-login' name='Log In' />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <NavigationItem path='/' name='Main Page' />
                    <NavigationItem path='/products' name='Products' />
                    {props.isAdminLoggedIn && <NavigationItem path='/products/create-product' name='Create Product' />}
                    {props.isUserLoggedIn && <NavigationItem  path='/cart' name='Cart' />}
                    <button onClick={props.logoutUser}>Log Out</button>
                </Fragment>
            );
        }
    };

    return (
        <div>
            {renderHeaderLinks()}
        </div>
    );
};

const mapStateToProps = state => {
    return { 
        isUserLoggedIn: state.auth.isUserLoggedIn,
        isAdminLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { logoutUser })(NavigationItems);