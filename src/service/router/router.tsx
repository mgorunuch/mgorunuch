import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import NotFound from "../../pages/not-found/not-found";
import Home from "../../pages/home/home";
import LifeWheel from "../../pages/life-wheel/life-wheel";
import PriorityDetector from "../../pages/priority-detector/priority-detector";
import IrregularWords from "../../pages/irregular-words";
import ContactsPage from '../../pages/contacts/contacts';
import EnglishGrammar from '../../pages/english-grammar/english-grammar';
import {Link} from 'react-router-dom';

class RouterContainer extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <div className="home-container">
            <Link to="" className="home-link">🏠 To homepage</Link>
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={ContactsPage} />
            <Route exact path="/wheel" component={LifeWheel} />
            <Route exact path="/priority" component={PriorityDetector} />
            <Route exact path="/irregular-verbs" component={IrregularWords} />
            <Route exact path="/english-grammar" component={EnglishGrammar} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RouterContainer;
