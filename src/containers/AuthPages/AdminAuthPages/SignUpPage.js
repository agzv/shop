import React from 'react';
import { connect } from 'react-redux';

import { createAdminUser } from '../../../redux/actions';
import SignUpForm from '../../../components/authForms/signUpForm/SignUpForm';
import { Fragment } from 'react';

const SignUpPage = props => {

    const onSubmit = formValues => {
        props.createAdminUser(formValues);
    };

    return (
        <Fragment>
            <h2 className='heading-secondary'>Sign Up</h2>
            <SignUpForm onFormSubmit={onSubmit} isAuthenticating={props.isAuthenticating} errors={props.errors} />
        </Fragment>
    )
};

const mapStateToProps = state => {
    return { 
        errors: state.auth.adminSignupFormErrors,
        isAuthenticating: state.auth.isAuthenticating
    };
};

export default connect(mapStateToProps, { createAdminUser })(SignUpPage);