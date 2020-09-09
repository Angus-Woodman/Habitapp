import React from 'react';
import HabitList from './HabitList';
import { toast } from 'react-toastify'

class AddHabitList extends React.Component {
// set correct id from prop from fetch in dashboard container
    state = {
        id: this.props.user_id,
        habit: '',
        frequency: 1,
        exists: false
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    
    addHabit = async e => {
      let habitExists = false
        e.preventDefault();
        for (let i = 0; i < this.props.habits.length; i++) {
          if (this.state.habit === this.props.habits[i].habit) {
            habitExists = true
            
            toast.error('Habit already exists');
            } 
        }
        console.log(habitExists)

        
        try {
          if (habitExists === false) {
            console.log(habitExists)
          const body = {
            id: this.state.id,
            habit: this.state.habit,
            frequency: this.state.frequency
          };
          const response = await fetch(
            "http://localhost:5000/dashboard/habits", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(body)
            }
          )
          .then(this.setState({habit: "", frequency: ""}))
          .then(this.props.closeModal())
          .then(window.location.reload(true))
        }} catch (err) {
          console.error(err.message);
        }
        console.log('hello world') 
        this.setState({habit: "", frequency: ""})
        this.props.closeModal()
        // window.location.reload(true)
    };

    render() {
        return (
            <>
            <button onClick={ this.props.closeModal }>Close Modal</button>
            <form onSubmit={ this.addHabit }>
                <label htmlFor="habit">Enter your habit:</label>
                <input id='habitInput' name='habit' type='text' required onChange={ this.handleInput }></input>
                <label htmlFor="frequency">How many times per week?</label>
                <select name="frequency" id="habitFrequency" required onChange={ this.handleInput }>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>
                <input type='submit'></input>
            </form>
            </>
        )
    }
}
export default AddHabitList;