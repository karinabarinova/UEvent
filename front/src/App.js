import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import routes from './routes';
import Page from './components/Page';
import Products from "./components/Products";
import Companies from "./components/Companies";
import SingleProduct from "./components/SingleProduct";
import SingleCompany from './components/SingleCompany';
import CreateProduct from "./components/CreateProduct";
import CreateCompany from "./components/CreateCompany";
import UpdateEvent from './components/UpdateEvent';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Products}/>
        <Route path='/events/:page' exact component={Products}/>
        <Route path='/companies/:page' exact component={Companies}/>
        <Route path='/event/:id' exact component={SingleProduct} />
        <Route path='/company/:id' exact component={SingleCompany} />
        <Route path='/new-event' exact component={CreateProduct}/>
        <Route path='/new-company' exact component={CreateCompany}/>
        <Route path='/update-event/:id' exact component={UpdateEvent}/>

      </Switch>
    )
    return (
      <>
        <Page>
          {routes}
        </Page>
      </>
    );
  }
}

export default App;
