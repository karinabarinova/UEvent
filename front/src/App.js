import React, { Component } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Page from './components/Page';
import SingleProduct from "./components/SingleProduct";
import SingleCompany from './components/SingleCompany';
import CreateProduct from "./components/CreateProduct";
import CreateCompany from "./components/CreateCompany";
import UpdateEvent from './components/UpdateEvent';
import UpdateCompany from './components/UpdateCompany';
import Orders from './pages/orders';
import Account from './components/Account';
import SingIn from './pages/signin';
import ProductsPage from './pages/products';
import CompaniesPage from './pages/companies';
import ResetPage from './pages/reset';
import Auth from './store/auth/auth';
import { CartStateProvider } from "./lib/cartState";

class App extends Component {

  render() {
    let routes = (
    	<Switch>
    		<Route path='/signin' exact component={SingIn}/>
    		<Route path='/reset' exact component={ResetPage} />
    		<Route path='/new-event' exact component={CreateProduct}/>
    		<Route path='/new-company' exact component={CreateCompany}/>
    		<Route path='/account' exact component={Account} />
        <Route path='/orders' exact component={Orders} />
    		<Route path='/' exact component={ProductsPage}/>
    		<Route path='/:page' exact component={ProductsPage}/>
    		<Route path='/companies/:page' exact component={CompaniesPage}/>
    		<Route path='/event/:id' exact component={SingleProduct} />
    		<Route path='/company/:id' exact component={SingleCompany} />
    		<Route path='/update-event/:id' exact component={UpdateEvent}/>
    		<Route path='/update-company/:id' exact component={UpdateCompany}/>
    	</Switch>
    )
    return (
      <>
        <Auth>
          <CartStateProvider>
            <Page>
                {routes}
            </Page>  
          </CartStateProvider>                   
        </Auth>
      </>
    );
  }
}

export default App;
