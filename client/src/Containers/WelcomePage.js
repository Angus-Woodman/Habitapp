import React from 'react'
import { Link } from "react-router-dom"

class WelcomePage extends React.Component {

    render() {
        return (
            <>
                <h1>welcome to our habitapp</h1>
                <p>How to use our app</p>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
        )
    }
}
export default WelcomePage
