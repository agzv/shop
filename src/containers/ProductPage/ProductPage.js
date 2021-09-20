import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts, deleteProduct } from '../../redux/actions';
import Loader from '../../components/Loader/Loader';
import Paginator from '../../components/Paginator/Paginator';
import './ProductPage.scss';

const ProductPage = props => {
    const { fetchProducts } = props;
    const [productsPage, setProductsPage] = useState(1);
    
    const loadProducts = useCallback(direction => {
        let page = productsPage;
        if(direction === 'next') {
            page++;
            setProductsPage(page);
        }

        if(direction === 'previous') {
            page--;
            setProductsPage(page);
        }
        fetchProducts(page);
    }, [fetchProducts, productsPage])
    
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);
    

    const renderProducts = () => {
        if(props.products.length <= 0) {
            return <Loader />
        }

        return props.products.map((product, index) => {
            return (
                <div key={product._id} className='product-item'>
                    <img src={`http://localhost:3100/${product.imageUrl}`} className={`product-item__img product-item__img-${index}`} alt={product.title}/>
                    <div className='product-item__info'>
                        <h4 className='product-item__title'>{product.title}</h4>
                        <p className='product-item__price'>$ {product.price}</p>
                    </div>
                    <Link to={`/products/product-detail/${product._id}`} className='product-item__detail'>Learn more...</Link>
                </div>
            );
        })
    };

    return (
        <section className='products'>
            <h2>Our Products</h2>
            <div className='product-items'>{renderProducts()}</div>
            <Paginator 
                currentPage={productsPage} 
                lastPage={Math.ceil(props.totalItems / 3)} 
                onPrevious={loadProducts.bind(this, 'previous')} 
                onNext={loadProducts.bind(this, 'next')}
                />
        </section>
    );
};

const mapStateToProps = state => {
    return { 
        products: state.products.products,
        totalItems: state.products.totalItems,
        isLoggedIn: state.auth.isLoggedIn,
        currentAdminUserId: state.auth.adminUserId
    };
};

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductPage);