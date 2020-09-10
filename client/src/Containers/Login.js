import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"
import '../styles/Login.css';

const Login = ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });


    const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div id='page'>
    <Link to='/' style={{ textDecoration: 'none' }}>
      <h1 class='headerLogo'>Habitapp</h1>
    </Link>
    <hr />
    <form onSubmit ={onSubmitForm}>
    <label htmlFor="email">Email</label>
        <input
          id = 'email'
          type="text"
          name="email"
          value={email}
          placeholder="Type your email"
          onChange={e => onChange(e)}
          autoFocus
          autoComplete="off"
        />
        <label htmlFor="password">Password</label>
        <input
          id = 'password'
          type="password"
          name="password"
          value={password}
          placeholder="Type your password"
          onChange={e => onChange(e)}
        />
        <button class='submitButtons'>Login</button>
      </form>
      <Link to="/register">Not registered?</Link>
    </div>
  );
};

export default Login;
