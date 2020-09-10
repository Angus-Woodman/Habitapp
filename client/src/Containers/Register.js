import React, { Fragment, useState } from "react";
import 'regenerator-runtime/runtime'
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const Register = ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordCopy: "",
    name: ""
  })

  const {email, password, name, passwordCopy} = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
const inputProps = {
  placeholder: 'Password',
  className: 'form-control my-3'
}
const numberCheck = () => {
    const matches = inputs.password.match(/\d+/g)
  if (matches != null) {
    return true
  }
}
const passwordsMatch = () => {
  if (inputs.password === inputs.passwordCopy) {
    return true
  }
}
  return (
    <Fragment>
    <h1> Register </h1>
    <form onSubmit ={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
       
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input 
        type='password'
        name='passwordCopy'
        value={passwordCopy}
        placeholder='Re-type password'
        onChange={e => onChange(e)}
        className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button disabled={inputs.password.length > 7 && numberCheck() && passwordsMatch() ? false : true}className="btn btn-success btn-block">Submit</button>
        <div className={inputs.password.length > 7 ? 'green' : 'red'}>Password must contain at least 8 characters</div>
        <div className={numberCheck() ? 'green' : 'red'}>Password must contain a number</div>
        <div className={passwordsMatch() ? 'green' : 'red'}>Passwords must match</div>
      </form>
      
      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
