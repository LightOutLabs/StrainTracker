import React from "react";
import Register from "./components/register/register";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import addStrain from "./components/dashboard/addStrain/addStrain";
import viewStrain from "./components/dashboard/viewStrain/viewStrain";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import dotenv from "dotenv";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/addStrain" component={addStrain} />
      <Route exact path="/viewStrain" component={viewStrain} />
    </Router>
  );
}

export default App;
