import React from 'react'
import { Link } from "react-router-dom"

class HabitList extends React.Component {
    render() {
        return (
            <>
                <h1>HELLO {this.props.name}!</h1>
                <p>your habit is {this.props.habit}</p>
                <p>{this.props.frequency} times a week</p>
                <p>This is from the HabitList Component</p>
            </>
        )
    }
}
export default HabitList
