import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationItems from './Navigation/NavigationItems';
import MainPage from '../containers/MainPage/MainPage';
import ProductPage from '../containers/ProductPage/Product';
import CreateProductPage from '../containers/CreateProductPage/CreateProduct';

const App = () => {
    return (
        <div>
            <Router>
                <NavigationItems />
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path='/products' exact component={ProductPage} />
                    <Route path='/products/create-product' component={CreateProductPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;