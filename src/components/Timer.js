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
      startTime: null
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
    const endTime = moment(total).unix() * 1000

    const timeEntry = {
      start: this.state.startTime,
      end: endTime,
      billable: true,
      description: "Billed meeting",
      projectId: process.env.PROJECT_ID,
    }

    axios
    .post('https://api.clockify.me/api/v1/workspaces/5cf6e9a6b07987371ebcf369/time-entries', {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key' : 'XPbc4lnaZRbCOFAB'
      },
      timeEntry
    } 
    ).then(res => {
      console.log(res)
      this.setState({
        client: res.data[0].name,
        clientPic: 'https://www.pinclipart.com/picdir/middle/12-129912_clip-art-images-sad-face-icon-png-transparent.png'
      }) 
    }).catch(err => {
      console.log(err)
    }) 


    this.setState({
      sentInvoice: !this.state.sentInvoice
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
          <h2 className="words"><span className="bitcoin-symbol">₿</span> {parseInt(this.state.time*0.02)}</h2>
          <ButtonGroup>
              {start}
              {resume}
              {stop}
              {reset}
              {stackSats}
          </ButtonGroup>
        </div>
        <div className="alert-wrapper">
          { this.state.sentInvoice === true ?
            <Alert color="primary">
             Your time was logged and your invoice was sent!
            </Alert>
          : null }
        </div>
      </div>
    )
  }
}

export default CustomTimer