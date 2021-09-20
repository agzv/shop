import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../../redux/actions';
import LoginForm from '../../../components/authForms/logInForm/LoginForm';
import './UserLoginPage.scss';

const UserLoginPage = props => {

    const onSubmit = formValues => {
        props.loginUser(formValues);
    };
    
    return (
        <div className='user-login-page'>
            <h2 className='heading-secondary'>Log In</h2>
            <LoginForm onSubmit={onSubmit} errors={props.errors} isAuthenticating={props.isAuthenticating} />
        </div>
    );
};

const mapStateToProps = state => {
    return { 
        errors: state.auth.userLoginFormErrors,
        isAuthenticating: state.auth.isAuthenticating
    };
};

export default connect(mapStateToProps, { loginUser })(UserLoginPage);