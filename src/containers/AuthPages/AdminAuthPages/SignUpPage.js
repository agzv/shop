import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createAdminUser } from '../../../redux/actions';
import SignUpForm from '../../../components/authForms/signUpForm/SignUpForm';

const SignUpPage = props => {
    const { error } = props;

    useEffect(() => {
        console.log(error);
    }, [error]);

    const onSubmit = formValues => {
        props.createAdminUser(formValues);
    };
    return (
        <div>
            <SignUpForm onFormSubmit={onSubmit} />
        </div>
    )
};

const mapStateToProps = state => {
    return { error: state.auth.error };
};

export default connect(mapStateToProps, { createAdminUser })(SignUpPage);