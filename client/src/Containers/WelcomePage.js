import React from 'react'
import { Link } from "react-router-dom"

class WelcomePage extends React.Component {

// Display number of users
  // componentDidMount = () => {
  //       fetch('http://localhost:3000/users')
  //       .then(data => console.log(data.length))
  //   }

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
