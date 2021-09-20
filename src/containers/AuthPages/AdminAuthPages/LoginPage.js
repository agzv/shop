import React from 'react';
import { connect } from 'react-redux';

import { loginAdminUser } from '../../../redux/actions';
import LoginForm from '../../../components/authForms/logInForm/LoginForm';
import { Fragment } from 'react';

const LoginPage = props => {

    const onSubmit = formValues => {
        props.loginAdminUser(formValues);
    };

    return (
        <Fragment>
            <h2 className='heading-secondary'>Log In</h2>
            <LoginForm onSubmit={onSubmit} isLoggedIn={props.isLoggedIn} isAuthenticating={props.isAuthenticating} errors={props.errors} />
        </Fragment>
    )
};

const mapStateToProps = state => {
    return { 
        errors: state.auth.adminLoginFormErrors,
        isAuthenticating: state.auth.isAuthenticating
    };
};

export default connect(mapStateToProps, { loginAdminUser })(LoginPage);