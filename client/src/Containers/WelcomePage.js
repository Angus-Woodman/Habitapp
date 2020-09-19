import React from 'react';
import { Link } from "react-router-dom";
import '../styles/WelcomePage.css';

class WelcomePage extends React.Component {
    render() {
        return (
            <>
                <h1>welcome to our habitapp</h1>
                <p>How to use our app</p>
                <Link id='linkLogin' to="/login">Login</Link>
                <Link id='linkRegister' to="/register">Register</Link>
            </>
        )
    }
}
export default WelcomePage
