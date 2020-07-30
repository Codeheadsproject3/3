import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";


function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <div>Log in</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;