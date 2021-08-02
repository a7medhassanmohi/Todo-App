import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Authcontext } from "./Authcontext";
function ProtectedRoute({ component: RouteComponent, ...rest }) {
  const users = useContext(Authcontext);
  return (
    <Route
      {...rest}
      render={(routeprops) =>
        !users ? <Redirect to="/login" /> : <RouteComponent {...routeprops} />
      }
    />
  );
}

export default ProtectedRoute;
