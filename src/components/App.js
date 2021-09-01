import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { authAutoLogin } from '../redux/actions';
import history from '../utilities/history';
import NavigationItems from './Navigation/NavigationItems';
import MainPage from '../containers/MainPage/MainPage';
import ProductPage from '../containers/ProductPage/ProductPage';
import CreateProductPage from '../containers/CreateProductPage/CreateProductPage';
import EditProductPage from '../containers/EditProductPage/EditProductPage';
import ProductDetailPage from '../containers/ProductDetailPage.js/ProductDetailPage';
import UserSignUpPage from '../containers/AuthPages/UserAuthPages/UserSignUpPage';
import UserLoginPage from '../containers/AuthPages/UserAuthPages/UserLoginPage';
import CartPage from '../containers/CartPage/CartPage';
import * as actionTypes from '../redux/actions/types';

const App = props => {
    const { authAutoLogin } = props;
    useEffect(() => {
        authAutoLogin(actionTypes.LOGIN_USER);
    }, [authAutoLogin]);

    return (
        <div>
            <Router history={history}>
                <NavigationItems />
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/products' exact component={ProductPage} />
                    <Route path='/products/product-detail/:productId' component={ProductDetailPage} />
                    {props.isAdminLoggenIn && <Route path='/products/create-product' exact component={CreateProductPage} />}
                    {props.isAdminLoggenIn && <Route path='/products/edit-product/:productId' component={EditProductPage} />}
                    {props.isUserLoggedIn && <Route path='/cart' component={CartPage} />}
                    <Route path='/auth/user-signup' exact component={UserSignUpPage} />
                    <Route path='/auth/user-login' exact component={UserLoginPage} />
                </Switch>
            </Router>
        </div>
    );
};

const mapStateToProps = state => {
    return { 
        isAdminLoggenIn: state.auth.isLoggenIn,
        isUserLoggedIn: state.auth.isUserLoggedIn
    };
};

export default connect(mapStateToProps, { authAutoLogin })(App);