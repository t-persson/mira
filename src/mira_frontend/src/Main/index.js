import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Home from '../Home'
import Test from '../Test'

class Main extends Component {
    render() {
       return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/test" component={Test} />
            </Switch>
        </Router>
       );
    }
}

export default Main;