import '../timer.css'
import { Button, ButtonGroup, Alert } from 'reactstrap';
import React from 'react'
import axios from 'axios'
import moment from 'moment'

class CustomTimer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
      sentInvoice: false,
      startTime: null,
      durationHours: null,
      durationMinutes: null,
      durationSeconds: null,
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {

    const now = new Date();
    const nowUnix = ( moment(now).unix() ) * 1000
    console.log(now)
    console.log(nowUnix)
    const isoString = now.toISOString();
    console.log(moment(isoString).unix() * 1000)
    console.log(now.getTime())

    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true,
      startTime: isoString
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

  createInvoice = () => {

    const ms = moment(this.state.startTime).unix() * 1000
    const total = ms + this.state.time
    console.log(total)
    const endTime = moment(total).toISOString()
    console.log(endTime)
    const duration = moment.duration("PT1M3.373S")
    console.log(duration._data.minutes)
    console.log(`Hours: ${duration._data.hours} Minutes: ${duration._data.minutes} seconds: ${duration._data.seconds}`)

    const timeEntry = {
      start: this.state.startTime,
      end: endTime,
      billable: true,
      description: "Billed meeting",
      projectId: "5cf6ec7fb07987371ebcf5a2",
      taskId: "5cf80359b07987371ebe6b58"
    }

    console.log(timeEntry)

    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key' : 'XPbc4lnaZRbCOFAB'
    }

    axios
    .post('https://api.clockify.me/api/v1/workspaces/5cf6e9a6b07987371ebcf369/time-entries', timeEntry, { headers: headers} 
    ).then(res => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    }) 


    this.setState({
      sentInvoice: !this.state.sentInvoice,
      durationHours: duration._data.hours,
      durationMinutes: duration._data.minutes,
      durationSeconds: duration._data.seconds,
    })

    const removeAlert = () => {
      this.setState({
        sentInvoice: !this.state.sentInvoice
      })
    }

    setTimeout(removeAlert, 2000)
  }
  render() {
    let start = (this.state.time === 0) ?
      <Button className="button" color="success" onClick={this.startTimer}>start</Button> :
      null
    let stop = (this.state.isOn) ?
      <Button className="button" color="danger" onClick={this.stopTimer}>stop</Button> :
      null
    let reset = (this.state.time !== 0 && !this.state.isOn) ?
      <Button className="button" color="info" onClick={this.resetTimer}>reset</Button> :
      null

      //this button should create a lightning invoice, and should also call the resetTimer function
    let stackSats = (this.state.time !== 0 && !this.state.isOn) ?
    <Button className="button" color="warning" onClick={this.createInvoice}>Stack sats</Button> :
    null
    let resume = (this.state.time !== 0 && !this.state.isOn) ?
      <Button className="button" color="primary" onClick={this.startTimer}>resume</Button> :
      null
    return(
      <div className="wrapper">
        <div className="buttons-wrapper">
          {this.state.durationHours === null 
          ? <h3 >{`Timer: ${parseInt(this.state.time)}`}</h3>
          : <div><h3>Duration: </h3> <h4>{`Timer: ${parseInt(this.state.time)}`}</h4><h4>{`Hours billed: ${this.state.durationHours} Minutes: ${this.state.durationMinutes} seconds: ${this.state.durationSeconds}`}</h4></div>

          }
          <div>
            <h2 className="words"><span className="bitcoin-symbol">₿</span> {parseInt(this.state.time*0.02)}</h2>
            <ButtonGroup>
                {start}
                {resume}
                {stop}
                {reset}
                {stackSats}
            </ButtonGroup>
            <div className="alert-wrapper">
              { this.state.sentInvoice === true ?
                <Alert color="primary">
                Your time was logged and your invoice was sent!
                </Alert>
              : null }
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default CustomTimer