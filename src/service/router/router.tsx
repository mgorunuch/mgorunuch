import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import NotFound from "../../pages/not-found/not-found";
import Home from "../../pages/home/home";

class RouterContainer extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RouterContainer;
