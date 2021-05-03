import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPg from "../Components/LandingPage/LandingPg";
import Home from "../Components/GaragePage/Home";
import ShowMoreGarages from "../Components/GaragePage/ShowMoreGarages";
import ServiceList from "../Components/MenuPage/ServiceList";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import MyAccountPage from "../Components/MyAccount/MyAccountPage";
import Confirmation from "../Components/CheckoutPage/Customer/Confirmation";
import Garage from '../Components/Garage/Garage';

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact render={() => <LandingPg />} />
        <Route path="/my-account" render={(props) => <MyAccountPage {...props}/>} />
        
      </Switch>
    </>
  );
};
