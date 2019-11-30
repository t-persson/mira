import React from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { client } from '../Lib/apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import {AuthProvider, useAuth} from "../Lib/auth_provider"

import Recipes from '../Recipes'
import Recipe from '../Recipe'
import Add from '../Add'
import Api from '../Api'
import Support from '../Support'
import Login from '../Login'
import Logout from '../Login/logout'
import routes from "../Lib/routes"
import Header from "./header"
import Register from "../Register"


function PrivateRoute({ component: Component, ...rest }) {
  const {data} = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: routes.login, state: { from: props.location} }} />
        )
      }
    />
  );
}


function Main(props) {

   return (
      <AuthProvider>
        <Router>
          <ApolloProvider client={client}>
            <Header />
            <Switch>
              <Route exact path={routes.recipes} component={Recipes} />
              <Route exact path={routes.recipe} component={Recipe} />
              <PrivateRoute exact path={routes.addRecipe} component={Add} />
              <Route exact path={routes.support} component={Support} />
              <Route exact path={routes.api} component={Api} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.logout} component={Logout} />
              <Route exact path={routes.register} component={Register} />
            </Switch>
           </ApolloProvider>
        </Router>
      </AuthProvider>
   );
}

export default Main;
