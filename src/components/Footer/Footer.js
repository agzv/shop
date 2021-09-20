import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutAdminUser } from '../../redux/actions';
import Button from '../UIButton/Button';
import './Footer.scss';
 
const Footer = props => {
    return (
        <footer className='footer'>
            Online Shop. All rights reserved.
            <div className='footer-auth'>
                {!props.isUserLoggedIn && !props.isAdminLoggedIn && <Link className='footer__link' to='/admin'>Admin Page</Link>}
                {props.isAdminLoggedIn && <Button onButtonClick={props.logoutAdminUser} modifier='footer-auth__btn' title='Logout'/>}
            </div>
        </footer>
    );
};

const mapStateToProps = state => {
    return { 
        isUserLoggedIn: state.auth.isUserLoggedIn,
        isAdminLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { logoutAdminUser })(Footer);