import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { logoutAdminUser } from '../../redux/actions';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {

    const renderHeaderLinks = () => {
        if(!props.isLoggedIn) {
            return (
                <Fragment>
                    <NavigationItem path='/' name='Main Page' />
                    <NavigationItem path='/products' name='Products' />
                    <NavigationItem path='/auth/admin-signup' name='Sign Up' />
                    <NavigationItem path='/auth/admin-login' name='Log In' />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <NavigationItem path='/' name='Main Page' />
                    <NavigationItem path='/products' name='Products' />
                    <NavigationItem path='/products/create-product' name='Create Product' />
                    <button onClick={props.logoutAdminUser}>Log Out</button>
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
    return { isLoggedIn: state.auth.adminUserId !== null };
};

export default connect(mapStateToProps, { logoutAdminUser })(NavigationItems);