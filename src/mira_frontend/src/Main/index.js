import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { client } from '../Lib/apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import Recipes from '../Recipes'
import Recipe from '../Recipe'
import Add from '../Add'
import Api from '../Api'
import Support from '../Support'
import routes from "../Lib/routes"
import Header from "./header"


class Main extends Component {
    render() {
       return (
        <Router>
          <ApolloProvider client={client}>
            <Header />
            <Switch>
                <Route exact path={routes.recipes} component={Recipes} />
                <Route exact path={routes.recipe} component={Recipe} />
                <Route exact path={routes.addRecipe} component={Add} />
                <Route exact path={routes.support} component={Support} />
                <Route exact path={routes.api} component={Api} />
            </Switch>
           </ApolloProvider>
        </Router>
       );
    }
}

export default Main;
