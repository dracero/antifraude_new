import React, { Component } from "react";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import GoogleBtn from "./sigin";
import Photo from "./photo";
import Moodle from "./iframe";
import store from "./store";
import { Provider } from "react-redux";

class App extends Component {
  componentDidMount() {
    if (document.getElementById("console")) {
      document.getElementById("console").innerText = "";
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="console"></div>
          <GoogleBtn />
          <Menu />
          <Switch>
            <Route path="/Photo" component={Photo} />
            <Route path="/Moodle" component={Moodle} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
