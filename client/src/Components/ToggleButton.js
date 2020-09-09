import React from 'react'

class ToggleButton extends React.Component {

    state = {
        checked: false
    }
    
    handleCheckBox = (e) => {
        this.setState(prevState => ({ checked: !prevState.checked }))
        const d = new Date()
        const day = d.getDate()
        const month = d.getMonth()
        const year = d.getFullYear()
        const dateNow = `${year}/${month}/${day}`
        console.log(dateNow)
        this.props.submitEvent(this.props.habit, dateNow)
    }
    
    render() {
        return (
            <>
                <label htmlFor={this.props.idx}>Today</label>
                <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckBox} id={this.props.idx} name={this.props.idx} value={this.props.idx} /> 
            </>
        )
    }
}

export default ToggleButton

