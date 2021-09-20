import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './LoginForm.scss';

const LoginForm = props => {
    const renderInput = ({ input, label, type, error }) => {
        
        return (
            <div className='form__group'>
                <label className='form__label'>{label}</label>
                <input {...input} type={type} className='form__input' />
                {error && <p className='form__error'>{error}</p>}
            </div>
        );
    };

    const onSubmit = formValues => {
        props.onSubmit(formValues);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)} className='form'>
            <Field name='email' component={renderInput} label='Email' error={props.errors && props.errors.email} />
            <Field name='password' component={renderInput} label='Password' type='password' error={props.errors && props.errors.password} />
            <button className={`btn action-btn ${props.isAuthenticating && 'loading'}`}>Log In</button>
        </form>
    );
};



export default reduxForm({
    form: 'AdminLoginForm'
})(LoginForm);
