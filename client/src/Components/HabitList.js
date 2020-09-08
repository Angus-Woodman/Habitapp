import React from 'react'
import { Link } from "react-router-dom"

class HabitList extends React.Component {
    render() {
        return (
            <>
            <div>
                <h1>HELLO {this.props.name}!</h1>
                <p>your habit is {this.props.habit}</p>
                <p>{this.props.frequency} times a week</p>
            </div>
            </>
        )
    }
}
export default HabitList
