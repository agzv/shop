import React, { useState } from 'react';

const ProductForm = props => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        props.onFormSubmit(title, description, price);
        setTitle('');
        setDescription('');
        setPrice('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input onChange={e => setTitle(e.target.value)} value={title} type='text' />
            </div>
            <div>
                <label>Description</label>
                <textarea onChange={e => setDescription(e.target.value)} value={description} />
            </div>
            <div>
                <label>Price</label>
                <input type='text' onChange={e => setPrice(e.target.value)} value={price} />
            </div>
            <div>
                <label>Upload an image</label>
                <input type='file' />
            </div>
            <button>Create Product</button>
        </form>
    );
};

export default ProductForm;