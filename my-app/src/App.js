import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Catch from './pages/Catch';

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
        <div>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin">Sign up</Link>
          </li>
          <li>
            <Link to="/catch">Catches</Link>
          </li>
        </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/catch" component={Catch} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;