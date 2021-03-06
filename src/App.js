import React from 'react';
import axios from 'axios'

import Timer from 'react-compound-timer'
import CustomTimer from './components/Timer'

import { Container, Row, Col } from 'reactstrap';
import HeaderNav from './components/NavBar' 
import ClientDropdown from './components/ClientDropdown'
import CaseDropdown from './components/CaseDropdown'
import Client from './components/Client'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: null,
      client: null,
      clientPic: null,
      stuff: 'stufff',
      clientSelected: false,
      caseSelected: false,
      timerOn: false,
      currentCase: null
    }
  }

  //process.env.WORKSPACE_ID
  componentDidMount() {
    //get clients
    axios
    .get('https://api.clockify.me/api/v1/workspaces/5cf6e9a6b07987371ebcf369/clients', {
      headers: {
        'X-Api-Key' : 'XPbc4lnaZRbCOFAB'
      }
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
    

  }

  createDate = () => {
    var now = new Date();
    var isoString = now.toISOString();
    console.log(isoString)
  }

  clickPete = () => {
    this.setState({
      clientSelected: !this.state.clientSelected
    })   
  }



  timerStarted = () => {
    this.setState({
      timerOn: !this.state.timerOn
    })   
  }

  renderCase = event => {
    console.log(event.currentTarget)
  this.setState({
    caseSelected: !this.state.caseSelected,
    currentCase: event.currentTarget.textContent
  })   
}

  render() {
    return (
      <>
      <HeaderNav/>
      <Container className="shadow">
        <Row className="header-row">
          <Col >
            <h1>May, Finney & Young Attorneys at Law</h1>
          </Col>
        </Row>
        <Row className="top-row">
          <Col sm="4" className="drop-down-box">
           <div className="button-grouping">
           <CaseDropdown renderCase={this.renderCase} title={'Select Case'}/>
            <ClientDropdown client={this.state.client} clickPete={this.clickPete} title={'Select Client'}/>
           </div>
           <h4 className="case-heading">Case:</h4>
           {this.state.caseSelected
            ? <h2 className="current-case">{this.state.currentCase}</h2>
            : <h2 className="hidden">a</h2>
            }
            <h4 className="client-heading">Client:</h4>
          </Col>
          <Col sm="8" className="tracker-box">
              <div>
                <h3 className="track-hours">Track hours</h3>
                <CustomTimer timerStarted={this.timerStarted}/>
              </div>
          </Col>
        </Row>
        <Row>
            { this.state.clientSelected
              ? <Client client={this.state.client} pic={this.state.clientPic} timerOn={this.state.timerOn}/>
              : <div></div>
            }
        </Row>

        {/* <button onClick={this.createDate}>Generat Date</button> */}

    </Container>
    </>
    )
  } 
}

export default App;

//$1 = 12,737 satoshi
