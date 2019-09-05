import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { client } from '../Lib/apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import Home from '../Home'
import Recipes from '../Recipes'
import Recipe from '../Recipe'
import routes from "../Lib/routes"
import Header from "./header"


class Main extends Component {
    render() {
       return (
        <Router>
          <ApolloProvider client={client}>
            <Header />
            <Switch>
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.recipes} component={Recipes} />
                <Route exact path={routes.recipe} component={Recipe} />
            </Switch>
           </ApolloProvider>
        </Router>
       );
    }
}

export default Main;