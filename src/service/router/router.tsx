import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import NotFound from "../../pages/not-found/not-found";
import Home from "../../pages/home/home";
import LifeWheel from "../../pages/life-wheel/life-wheel";
import PriorityDetector from "../../pages/priority-detector/priority-detector";
import IrregularWords from "../../pages/irregular-words";

class RouterContainer extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/wheel" component={LifeWheel} />
            <Route exact path="/priority" component={PriorityDetector} />
            <Route exact path="/irregular-words" component={IrregularWords} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RouterContainer;
