import React, { Component } from "react";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import routes from './routes';
import Page from './components/Page';
import SingleProduct from "./components/SingleProduct";
import SingleCompany from './components/SingleCompany';
import CreateProduct from "./components/CreateProduct";
import CreateCompany from "./components/CreateCompany";
import UpdateEvent from './components/UpdateEvent';
import UpdateCompany from './components/UpdateCompany';
import SingIn from './pages/signin';
import ProductsPage from './pages/products';
import CompaniesPage from './pages/companies';
import Auth from './store/auth/auth';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={ProductsPage}/>
        <Route path='/:page' exact component={ProductsPage}/>
        <Route path='/companies/:page' exact component={CompaniesPage}/>
        <Route path='/event/:id' exact component={SingleProduct} />
        <Route path='/company/:id' exact component={SingleCompany} />
        <Route path='/new-event' exact component={CreateProduct}/>
        <Route path='/new-company' exact component={CreateCompany}/>
        <Route path='/update-event/:id' exact component={UpdateEvent}/>
        <Route path='/update-company/:id' exact component={UpdateCompany}/>
        <Route path='/signin' exact component={SingIn}/>

      </Switch>
    )
    return (
      <>
        <Auth>
          <Page>
            {/* <Router history={history}> */}
              {routes}
            {/* </Router> */}
          </Page>                     
        </Auth>
      </>
    );
  }
}

export default App;
