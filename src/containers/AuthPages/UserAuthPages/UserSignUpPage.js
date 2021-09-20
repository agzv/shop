import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../../redux/actions';
import SignUpForm from '../../../components/authForms/signUpForm/SignUpForm';
import './UserSignUpPage.scss';

const UserSignUpPage = props => {

    const onSubmit = formValues => {
        props.createUser(formValues);
    };

    return (
        <div className='user-signup-page'>
            <h2 className='heading-secondary'>Sign Up</h2>
            <SignUpForm onFormSubmit={onSubmit} errors={props.errors} isAuthenticating={props.isAuthenticating}/>
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        errors: state.auth.userSignupFormErrors,
        isAuthenticating: state.auth.isAuthenticating
    };
};

export default connect(mapStateToProps, { createUser })(UserSignUpPage);