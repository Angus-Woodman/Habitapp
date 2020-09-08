import React from 'react';

class AddHabitList extends React.Component {
// set correct id from prop from fetch in dashboard container
    state = {
        id: '',
        habit: '',
        Frequency: '1'
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

    addHabit = async e => {
        e.preventDefault();
        try {
          const body = this.state;
          const response = await fetch(
            "http://localhost:5000/dashboard/habits", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(body)
            }
          );

        } catch (err) {
          console.error(err.message);
        }
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
