import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SignUpForm = props => {

    const renderInput = ({ input, label, type }) => {
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} autoComplete='off' />
            </div>
        )
    };

    const onSubmit = formValues => {
        props.onFormSubmit(formValues);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field name='firstName' component={renderInput} label='First Name' />
            <Field name='lastName' component={renderInput} label='Last Name' />
            <Field name='email' component={renderInput} label='Email' type='email' />
            <Field name='password' component={renderInput} label='Password' type='password' />
            <Field name='confirmPassword' component={renderInput} label='Confirm your password' type='password' />
            <Field name='country' component={renderInput} label='Country' />
            <Field name='address' component={renderInput} label='Address' />
            <Field name='zip' component={renderInput} label='Zip Code' />
            <button>Sign Up</button>
        </form>
    );
};

export default reduxForm({
    form: 'AdminSignUpForm'
})(SignUpForm);