import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./component/Search";
import Home from "./component/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
    <Router>
    <h2>Github Profle Finder</h2>
      <Switch className="router">
      
        <Route path="/" exact component={Search} />
        <Route path="/home/:username" component={Home} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
