import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../../redux/actions';
import LoginForm from '../../../components/authForms/logInForm/LoginForm';

const UserLoginPage = props => {

    const onSubmit = formValues => {
        props.loginUser(formValues);
    };

    return (
        <div>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, { loginUser })(UserLoginPage);