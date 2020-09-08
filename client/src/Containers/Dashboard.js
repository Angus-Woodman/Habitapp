import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";


const Dashboard = ({setAuth}) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
   getName();
 }, []);


  return (
    <Fragment>
    <h1> Hello {name} </h1>

    <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
