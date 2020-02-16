import React, { Component } from 'react';
import './App.css';
import HomePage from "./pages/homepage/Home.page";
import ShopPage from "./pages/shop/Shop.page";
import Header from "./components/header/Header.component";
import AuthPage from "./pages/authpage/Auth.page";
import { Route, Switch } from "react-router-dom";

const HatsPage = props => (
  <div>Hats Page</div>
);

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={false} path="/shop" component={ShopPage} />
          <Route exact={false} path="/signin" component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
