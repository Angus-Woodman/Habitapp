import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import HabitList from "../Components/HabitList";
import ReactModal from 'react-modal';
import AddHabit from '../Components/AddHabit';
if (process.env.NODE_ENV !== "test") ReactModal.setAppElement("#root");


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [user_id, setUserId] = useState("946649e9-54ea-447c-8a9e-244a9b155fda")
    const [habits, setHabits] = useState([{ user_id: '6d235d99-50e0-4321-a443-4a5920d52132', habit: 'Running', habitdate: '2020-10-10' }]);
    const [isModalOpen, setModalOpen] = useState(false);

    const getName = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard/habits", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);
            setHabits(parseRes);
            if(parseRes.length !== 0) {
                setName(parseRes[0].user_name);
                setUserId(parseRes[0].user_id)
            } else {
                const res = await fetch("http://localhost:5000/dashboard/", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                const parseRes = await res.json();
                setName(parseRes.user_name)
                setUserId(parseRes.user_id)
            }

            

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

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }


    useEffect(() => {
        getName();
    }, []);

    // console.log(habits);

    return (
        <Fragment>
            <h1> Hello {name}!!!!! </h1>

            <button id="addHabit" onClick={ openModal }>Add habit</button>
            <ReactModal isOpen={ isModalOpen }>
                <AddHabit habits={habits} user_id={ user_id } closeModal = { closeModal } />
            </ReactModal>

            <button id="logout" onClick={e => logout(e)} className="btn btn-primary">
                Logout
            </button>

            <HabitList habits={habits}/>
            
        </Fragment>
    );
};

export default Dashboard;
