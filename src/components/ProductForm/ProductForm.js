import React from 'react';
import { reduxForm, Field } from 'redux-form';

import FieldFileInput from './FilePicker';

const ProductForm = props => {

    const renderInput = ({ input, label, type, error }) => {
        return (
            <div className='form__group'>
                <label className='form__label'>{label}</label>
                <input {...input} type={type} autoComplete='off' className='form__input' />
                {error && <p className='form__error'>{error}</p>}
            </div>
        )
    };

    const onSubmit = formValues => {
        props.onSubmit(formValues);
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)} className='form'>
            <Field name="title" component={renderInput} label='Enter Title' error={props.errors && props.errors.title} />
            <Field name="description" component={renderInput} label='Enter Description' error={props.errors && props.errors.description} />
            <Field name="price" component={renderInput} label='Enter Price' error={props.errors && props.errors.price} />
            <Field name="image" component={FieldFileInput} label='Upload an image' type="file" error={props.errors && props.errors.image} />
            <Field name='category' component={renderInput} label='Enter Category' error={props.errors && props.errors.category} />
            <button className={`btn action-btn ${props.productIsCreating && 'loading'}`}>Submit</button>
        </form>
    );
}

export default reduxForm({
    form: 'productForm'
})(ProductForm);