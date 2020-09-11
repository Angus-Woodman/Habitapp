import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../styles/HabitInfo.css"

class HabitInfo extends React.Component {
    state = {
        date: new Date(),
        isModalOpen: this.props.isModalOpen,
        checked: false
    }

  onChange = date => this.setState({ date })

  onClickDay = (value) => {
    let d = value.getDate();
    let m = value.getMonth()+1;
    let y = value.getFullYear();
    if(d<10) {
        d='0'+d;
    }

    if(m<10) {
        m='0'+m;
    }
    let eventDate = (y + "-" + m + "-" + d)
    if(this.state.checked === false){
        this.props.submitEvent(this.props.habit, eventDate)
        this.setState({ checked: true })
    } else {
        this.props.removeEvent(this.props.habit, eventDate)
        this.setState({ checked: false })
    }

  }

  render() {
    return (
      <div id="habitInfoContainer">
            <Calendar
            className='calendar'
            onChange={this.onChange}
            value={this.state.date}
            onClickDay = {this.onClickDay}
            />
            <i onClick={ this.props.closeModal } className="far fa-window-close fa-3x modalExit"></i>
      </div>
    );
  }
}

export default HabitInfo;
