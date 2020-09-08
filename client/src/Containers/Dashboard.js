import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import HabitList from "../Components/HabitList";


const Dashboard = ({setAuth}) => {

    // let name;
    // let frequency;
    // let habit;

    const [name, setName] = useState("");
    const [freq, setFreq] = useState("");
    const [habit, setHabit] = useState("");

    // const freqs = []


    const getName = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);
            
            //   name = parseRes.user_name
            //   frequency = parseRes.frequency
            //   habit = parseRes.habit
                // for (let i = 0; i < parseRes.length; i++) {
                //   habits.push(parseRes[i].habit)
                //   freqs.push(parseRes[i].frequency)
                // }
            //   console.log(habits)
            //   console.log(freqs)

            setName(parseRes[0].user_name);
            // setFreq(parseRes.frequency);
            // setHabit(parseRes.habit);
            let randomString = "hello there!"

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
            {/* <div>
                <HabitList name={name} frequency={freq} habit={habit}/>
            </div>

            <HabitList name={name} frequency={freq} habit={habit}/> */}


            {/* <div>
                {parseRes.map((item, idx) => {
                    return <li key={idx}>{item}<HabitList /></li>;
                })}
            </div> */}
            
        </Fragment>
    );
};

export default Dashboard;
