import React from "react";
import { useState } from "react";
import { SERVER_URL } from "../constants";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CarList from "./CarList";

const Login = () => {

const [user, setUser] = useState({ username: "", password: "" });
const [isAuthenticated, setAuth] = useState(false);

const handleChange = (event) => {
  setUser({ ...user, [event.target.name]: event.target.value });
};

const login = () => {
  fetch(SERVER_URL + "login", {
    method: "POST",
    body: JSON.stringify(user),
  })
    .then((res) => {
      const jwtToken = res.headers.get("Authorization");
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
      else {
        toast.warn("Check your username and password", {
          position: toast.POSITION.BOTTOM_LEFT
        }) 
      }
    })
    .catch((err) => console.error(err));
};




  if (isAuthenticated === true) {
    return <CarList/>;
  } else {
    return (
      <div>
        <TextField name="username" label="Username" onChange={handleChange} />
        <br />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="outlined" color="primary" onClick={login}>
          Login
        </Button>


        <ToastContainer autoClose={1500} /> 
      </div>
    );
  }

}
export default Login;
