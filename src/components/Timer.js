import '../timer.css'
import { Button, ButtonGroup } from 'reactstrap';
import React from 'react'


class CustomTimer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);

    this.props.timerStarted()
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    
    this.props.timerStarted()

  }
  resetTimer() {
    this.setState({time: 0})
  }
  render() {
    let start = (this.state.time == 0) ?
      <Button color="success" onClick={this.startTimer}>start</Button> :
      null
    let stop = (this.state.isOn) ?
      <Button color="danger" onClick={this.stopTimer}>stop</Button> :
      null
    let reset = (this.state.time != 0 && !this.state.isOn) ?
      <Button color="info" onClick={this.resetTimer}>reset</Button> :
      null

      //this button should create a lightning invoice, and should also call the resetTimer function
    let stackSats = (this.state.time != 0 && !this.state.isOn) ?
    <Button color="warning" onClick={this.createInvoice}>Stack sats</Button> :
    null
    let resume = (this.state.time != 0 && !this.state.isOn) ?
      <Button color="primary" onClick={this.startTimer}>resume</Button> :
      null
    return(
      <div>
        <h2 className="words"><span className="bitcoin-symbol">₿</span> {parseInt(this.state.time*0.02)}</h2>
        <ButtonGroup>
            {start}
            {resume}
            {stop}
            {reset}
            {stackSats}
        </ButtonGroup>
      </div>
    )
  }
}

export default CustomTimer