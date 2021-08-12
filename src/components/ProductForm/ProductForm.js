import React from 'react';

const ProductForm = () => {
    return (
        <form>
            <div>
                <label>Title</label>
                <input type='text' />
            </div>
            <div>
                <label>Description</label>
                <textarea />
            </div>
            <div>
                <label>Price</label>
                <input type='text' />
            </div>
            <div>
                <label>Upload an image</label>
                <input type='file' />
            </div>
        </form>
    );
};

export default ProductForm;