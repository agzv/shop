import React from 'react';
import { reduxForm, Field } from 'redux-form';

const ProductForm = props => {

    const renderInput = ({ input, label, type }) => {
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} autoComplete='off'/>
            </div>
        )
    };

    const onSubmit = formValues => {
        props.onSubmit(formValues);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field name="title" component={renderInput} label='Enter Title' />
            <Field name="description" component={renderInput} label='Enter Description' />
            <Field name="price" component={renderInput} label='Enter Price' />
            <Field name="image" component={renderInput} label='Pick your image' type='file' />
            <button>Submit</button>
        </form>
    );
}

export default reduxForm({
    form: 'productForm'
})(ProductForm);