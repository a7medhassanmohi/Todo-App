import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/umd/popper.min";
import "bootstrap/dist/js/bootstrap.min";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import ProtectedRoute from "./pages/Authcontect/ProtectedRoute";
import Protectedroytereverse from "./pages/Authcontect/protectedroytereverse";

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Authcontextt, { Authcontext } from "./pages/Authcontect/Authcontext";
import React, { useContext, useState } from "react";
import { createContext } from "react";
export const Namecontext = createContext();

export default function App(props) {
  let namess = "";
  return (
    <div className="app">
      <Authcontextt>
        <Namecontext.Provider value={{ namess }}>
          <Switch>
            <ProtectedRoute exact path="/home" component={Home} />

            <Protectedroytereverse path="/login" component={Login} />
            <Protectedroytereverse path="/register" component={Register} />
            <Redirect from="*" to="/login" />
          </Switch>
        </Namecontext.Provider>
      </Authcontextt>
    </div>
  );
}
