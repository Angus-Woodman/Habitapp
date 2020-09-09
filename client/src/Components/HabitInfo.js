import React from 'react';
import Calendar from 'react-calendar'

class HabitInfo extends React.Component {
    render() {
        return(
            <>
            <button onClick={ this.props.closeModal }>Close</button>
            <Calendar />
            </>
        )
    }
}

export default HabitInfo;