import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import { NavBar,Footer} from "./components";//, Footer,  
import { Home } from "./view";
import Redirect from "./components/Redirect";
import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <div className="container flex-grow-1">
              {/* <Route path="/" exact render={() => ( */}
      <div className="body-wrap">
        <Switch>
              <Route data-testid="home" path="/" exact component={Home} />
              <Route data-testid="id" path="/:id" component={Redirect} exact />
        </Switch>
        </div>        
        </div>
        <Footer />
        </div>
        </Router>
    );
  }
}

export default App;
