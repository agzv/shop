import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../../redux/actions';
import SignUpForm from '../../../components/authForms/signUpForm/SignUpForm';

const UserSignUpPage = props => {

    const onSubmit = formValues => {
        console.log(formValues);
        props.createUser(formValues);
    };

    return (
        <div>
            <SignUpForm onFormSubmit={onSubmit}/>
        </div>
    )
};

export default connect(null, { createUser })(UserSignUpPage);