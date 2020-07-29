import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Signup(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.referer || '/';


    function handleSubmit () {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
      } else {
        alert("You have successfully created an account!")
      }
    }
  
    function postSignup() {
      
      axios.post('/signup', {
        userName,
        password,
        confirmPassword
      }).then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      }).catch(e => {
        setIsError(true);
      });
    }
  
    if (isLoggedIn) {
      return <Redirect to={referer} />;
    }
    

      return (
        <Card>
          <Logo src={logoImg} />
          <Form>
            <Input
              type="username"
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
              }}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={e => {
                setconfirmPassword(e.target.value);
              }}
              placeholder="password again"
            />
            <Button onClick={postSignup}
            >Sign Up</Button>
          </Form>
        </Card>

        

      );


    }

  




export default Signup;