import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loginAdminUser } from '../../../redux/actions';
import LoginForm from '../../../components/authForms/logInForm/LoginForm';

const LoginPage = props => {
    const { error } = props;

    useEffect(() => {
        console.log(error)
    }, [error]);

    const onSubmit = formValues => {
        props.loginAdminUser(formValues);
    };

    return <LoginForm onSubmit={onSubmit} isLoggedIn={props.isLoggedIn}  />;
};

const mapStateToProps = state => {
    return { error: state.auth.error };
};

export default connect(mapStateToProps, { loginAdminUser })(LoginPage);