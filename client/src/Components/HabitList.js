import React from 'react'
import { Link } from "react-router-dom"

class HabitList extends React.Component {
    render() {

        return (
            <>
            <div>
                {this.props.habits.length !== 0 ? <h1>HELLO {this.props.habits[0].user_name}!</h1> : <h1>Hello</h1> }
                {/* <h1>HELLO {this.props.habits[0].user_name}!</h1> */}
                {this.props.habits.map((item, idx) => {
                    return (
                        <ul key={idx}>
                            <li>
                                {item.habit}
                            </li>
                            <li>
                                {item.frequency} times per week
                            </li>
                        </ul>
                    )
                })}
            </div>
            </>
        )
    }
}
export default HabitList
