import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { imported } from 'react-imported-component/macro';

const Home = imported(() => import('screens/Home'));

class App extends Component {
  render() {
    // Checks if homepage in package.json exists
    const basename = process.env.PUBLIC_URL || undefined;

    return (
      <Router basename={basename}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
