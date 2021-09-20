import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './SignUpForm.scss';
import '../../../scss/general.scss';

const SignUpForm = props => {

    const renderInput = ({ input, label, type, error }) => {
        return (
            <div className='form__group'>
                <label className='form__label'>{label}</label>
                <input {...input} type={type} autoComplete='off' className='form__input' />
                {error && <p className={`form__error active`}>{error}</p>}
            </div>
        )
    };

    const onSubmit = formValues => {
        props.onFormSubmit(formValues);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)} className='form'>
            <Field name='firstName' component={renderInput} label='First Name' error={props.errors && props.errors.firstName} />
            <Field name='lastName' component={renderInput} label='Last Name' error={props.errors && props.errors.lastName} />
            <Field name='email' component={renderInput} label='Email' type='email' error={props.errors && props.errors.email} />
            <Field name='password' component={renderInput} label='Password' type='password' error={props.errors && props.errors.password} />
            <Field name='confirmPassword' component={renderInput} label='Confirm your password' type='password' error={props.errors && props.errors.confirmPassword} />
            <Field name='country' component={renderInput} label='Country' error={props.errors && props.errors.country} />
            <Field name='address' component={renderInput} label='Address' error={props.errors && props.errors.address} />
            <Field name='zip' component={renderInput} label='Zip Code' error={props.errors && props.errors.zip} />
            <button className={`btn action-btn ${props.isAuthenticating && 'loading'}`}>Sign Up</button>
        </form>
    );
};

export default reduxForm({
    form: 'AdminSignUpForm'
})(SignUpForm);