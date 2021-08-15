import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import history from '../utilities/history';
import NavigationItems from './Navigation/NavigationItems';
import MainPage from '../containers/MainPage/MainPage';
import ProductPage from '../containers/ProductPage/ProductPage';
import CreateProductPage from '../containers/CreateProductPage/CreateProductPage';
import EditProductPage from '../containers/EditProductPage/EditProductPage';
import SignUpPage from '../containers/AuthPages/AdminAuthPages/SignUpPage';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <NavigationItems />
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/products' exact component={ProductPage} />
                    <Route path='/products/create-product' component={CreateProductPage} />
                    <Route path='/products/edit-product/:productId' component={EditProductPage} />
                    <Route path='/auth/signup' component={SignUpPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;