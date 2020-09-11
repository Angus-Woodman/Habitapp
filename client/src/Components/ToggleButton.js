import React from 'react'
import "../styles/toggleButton.css";

class ToggleButton extends React.Component {

    state = {
        checked: false
    }

    handleCheckBox = (e) => {
        this.setState(prevState => ({ checked: !prevState.checked }))
        const d = new Date()
        const day = d.getDate()
        const month = d.getMonth()+1
        const year = d.getFullYear()
        const dateNow = `${year}/${month}/${day}`
        if (this.state.checked === false) {
            this.props.submitEvent(this.props.habit, dateNow)
        } else {
            this.props.removeEvent(this.props.habit, dateNow)
        }

    }

    render() {
        return (
            <>
                <label htmlFor={this.props.idx}>Habit done for today: </label>
                <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckBox} id={this.props.idx} name={this.props.idx} value={this.props.idx} />
            </>
        )
    }
}

export default ToggleButton
