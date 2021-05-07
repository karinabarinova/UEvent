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
import SingleProduct from "./components/SingleProduct";
import CreateProduct from "./components/CreateProduct";

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Products}/>
        <Route path='/events/:page' exact component={Products}/>
        <Route path='/event/:id' exact component={SingleProduct} />
        <Route path='/create' exact component={CreateProduct}/>
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
