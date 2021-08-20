import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
    const renderInput = ({ input, label, type }) => {
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} />
            </div>
        );
    };

    const onSubmit = formValues => {
        props.onSubmit(formValues);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field name='email' component={renderInput} label='Email' />
            <Field name='password' component={renderInput} label='Password' type='password' />
            <button>Log In</button>
        </form>
    );
};

export default reduxForm({
    form: 'AdminLoginForm'
})(LoginForm);
