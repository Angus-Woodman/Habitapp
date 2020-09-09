import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import HabitList from "../Components/HabitList";


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [habits, setHabits] = useState([{}]);

    const getName = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);
            setHabits(parseRes);

            setName(parseRes[0].user_name);

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

    console.log(habits);

    return (
        <Fragment>
            <h1> Hello {name}!!!!! </h1>

            <button onClick={e => logout(e)} className="btn btn-primary">
                Logout
            </button>
            {/* <div>
                <HabitList name={name} frequency={freq} habit={habit}/>
            </div>

            <HabitList name={name} frequency={freq} habit={habit}/> */}


            <HabitList habits={habits}/>
            
        </Fragment>
    );
};

export default Dashboard;
