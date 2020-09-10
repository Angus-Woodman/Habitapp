import React from 'react';
import ToggleButton from "./ToggleButton";
import ReactModal from 'react-modal';
import HabitInfo from './HabitInfo';
import "../styles/habitList.css";
ReactModal.setAppElement("#root");

class HabitList extends React.Component {
    state = {
        isModalOpen: false,
        habit: ""
    }

    openModal = (e) => {
        this.setState({ isModalOpen: true })
        this.setState({ habit: this.props.habits[e.target.id].habit})

    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    handleCheckbox = (e) => {
        this.setState({ checked: e.target.checked })
    }

    submitEvent = (habit, eventDate) => {
        const newEvent = {
            id: this.props.habits[0].user_id,
            habit: habit,
            date: eventDate
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers: { 'Content-Type' : 'application/json' }
        }
        fetch(`http://localhost:5000/dashboard/events`, options)
        .catch(console.warn)
    }

    removeEvent = (habit, eventDate) => {
        const deleteEvent = {
            id: this.props.habits[0].user_id,
            habit: habit,
            date: eventDate
        }
        const options = {
            method: 'DELETE',
            body: JSON.stringify(deleteEvent),
            headers: { 'Content-Type' : 'application/json' }
        }
        fetch(`http://localhost:5000/dashboard/events`, options)
        .catch(console.warn)
    }

    render() {

        return (
            <>
                <div id="habitListContainer">
                    {/*{this.props.habits.length !== 0 ? <h1>HELLO {this.props.habits[0].user_name}!</h1> : <h1>Hello</h1> */}

                    {this.props.habits.map((item, idx) => {
                        return (
                            <div class="gridItem" key={idx} onClick={e => this.openModal(e) }>
                            <h2 id={idx} >{item.habit}</h2>
                            <ToggleButton removeEvent={this.removeEvent} submitEvent={this.submitEvent} removeEvent={this.removeEvent} idx={idx} habit={item.habit}/>
                            <p>{item.frequency} times per week </p>
                            </ div>
                        )
                    })}

                    <ReactModal isOpen= { this.state.isModalOpen }>
                        <HabitInfo isModalOpen={this.state.isModalOpen} habit={ this.state.habit } submitEvent={ this.submitEvent } removeEvent={ this.removeEvent } closeModal={ this.closeModal } />
                    </ReactModal>

                </div>
            </>
        )
    }
}

export default HabitList
