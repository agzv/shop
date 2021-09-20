import React, { useEffect } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../redux/actions/types';
import { authAutoLogin, authAutoLoginAdmin } from '../redux/actions';
import history from '../utilities/history';
import NavigationItems from './Navigation/NavigationItems';
import MainPage from '../containers/MainPage/MainPage';
import ProductPage from '../containers/ProductPage/ProductPage';
import CreateProductPage from '../containers/CreateProductPage/CreateProductPage';
import EditProductPage from '../containers/EditProductPage/EditProductPage';
import ProductDetailPage from '../containers/ProductDetailPage.js/ProductDetailPage';
import UserSignUpPage from '../containers/AuthPages/UserAuthPages/UserSignUpPage';
import UserLoginPage from '../containers/AuthPages/UserAuthPages/UserLoginPage';
import AdminPage from '../containers/AdminPage/AdminPage';
import CartPage from '../containers/CartPage/CartPage';
import OrdersPage from '../containers/OrdersPage/OrdersPage';
import Footer from './Footer/Footer';
import SignUpPage from '../containers/AuthPages/AdminAuthPages/SignUpPage';
import LoginPage from '../containers/AuthPages/AdminAuthPages/LoginPage';

import '../scss/base.scss';
import './App.scss';

const App = props => {
    const { authAutoLogin, authAutoLoginAdmin } = props;
    useEffect(() => {
        authAutoLogin(actionTypes.LOGIN_USER);
        authAutoLoginAdmin(actionTypes.LOGIN_USER_ADMIN);
    }, [authAutoLogin, authAutoLoginAdmin]);
    
    return (
        <div className='container'>
            <Router history={history}>
                <NavigationItems />
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/products' exact component={ProductPage} />
                    <Route path='/products/product-detail/:productId' exact component={ProductDetailPage} />
                    {props.isAdminLoggenIn && <Route path='/products/create-product' exact component={CreateProductPage} />}
                    {props.isAdminLoggenIn && <Route path='/products/edit-product/:productId' exact component={EditProductPage} />}
                    {props.isUserLoggedIn && <Route path='/cart' exact component={CartPage} />}
                    {props.isUserLoggedIn && <Route path='/orders' exact component={OrdersPage} />}
                    {!props.isAdminLoggenIn && <Route path='/auth/user-signup' exact component={UserSignUpPage} />}
                    {!props.isAdminLoggenIn && <Route path='/auth/user-login' exact component={UserLoginPage} /> }
                    {!props.isUserLoggedIn && <Route path='/admin' exact component={AdminPage} />}
                    <Route path='/admin/login' render={() => (
                         <section className='admin-page'>
                            <LoginPage />
                            <p className='admin-page__help'>Don't have an account ? <Link to='/admin/signup' className='admin-page__link'>Sign Up</Link></p>
                        </section>
                    )} />
                    <Route path='/admin/signup' render={() => (
                         <section className='admin-page'>
                            <SignUpPage />
                            <p className='admin-page__help'>Go to <Link to='/admin/login' className='admin-page__link'>Login</Link></p>
                        </section>
                    )} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
};

const mapStateToProps = state => {
    return { 
        isAdminLoggenIn: state.auth.isLoggedIn,
        isUserLoggedIn: state.auth.isUserLoggedIn
    };
};

export default connect(mapStateToProps, { authAutoLogin, authAutoLoginAdmin })(App);