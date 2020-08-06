import React, { useState, Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import './App.css';
import Catch from './pages/Catch';
import Dashboard from "./pages/Dashboard";
import Information from "./pages/Information";
import Upload from "./pages/Upload"



function App(props) {
  const [authTokens, setAuthTokens] = 
  useState(localStorage.getItem('authTokens') || '');
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
     
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/catch" component={Catch} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/information" component={Information} />
          <Route path="/Upload" component={Upload} />

          <PrivateRoute path="/admin" component={Admin} />
        
            <div class="btn btn-large blue darken-4 white-text">
                  <Link to="/">Home Page</Link>
            </div>
            <div class="btn btn-large blue darken-4 white-text">
                  <Link to="/admin">Log in</Link>
            </div>
            <div class="btn btn-large blue darken-4 white-text">
                  <Link to="/dashboard">Dashboard</Link>
            </div>

           
      </Router>
    </AuthContext.Provider>
   
  );


}

export default App;