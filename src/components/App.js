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
import SignUpPage from '../containers/AuthPages/AdminAuthPages/SignUpPage';
import LoginPage from '../containers/AuthPages/AdminAuthPages/LoginPage';

const App = props => {
    const { authAutoLogin } = props;
    useEffect(() => {
        authAutoLogin();
    }, [authAutoLogin]);

    return (
        <div>
            <Router history={history}>
                <NavigationItems />
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/products' exact component={ProductPage} />
                    <Route path='/products/create-product' component={CreateProductPage} />
                    <Route path='/products/edit-product/:productId' component={EditProductPage} />
                    <Route path='/auth/admin-signup' component={SignUpPage} />
                    <Route path='/auth/admin-login' component={LoginPage} />
                </Switch>
            </Router>
        </div>
    );
};

const mapStateToProps = state => {
    return { isLoggenIn: state.auth.isLoggenIn };
};

export default connect(mapStateToProps, { authAutoLogin })(App);