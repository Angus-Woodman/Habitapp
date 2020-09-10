import React from 'react';
import Calendar from 'react-calendar';
import ReactModal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
 
class HabitInfo extends React.Component {
    state = {
        date: new Date(),
        isModalOpen: this.props.isModalOpen
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
    console.log(y + "-" + m + "-" + d);
    this.props.submitEvent(this.props.habit, eventDate) 
  }
 
  render() {
    return (
      <div>
        
            <Calendar
            showWeekNumbers
            onChange={this.onChange}
            value={this.state.date}
            onClickDay = {this.onClickDay}
            />
            <button onClick={ this.props.closeModal }>Close</button>
      </div>
    );
  }
}

export default HabitInfo;