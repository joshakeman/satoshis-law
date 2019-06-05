import React from 'react';
import './App.css';
import cswGif from './images/csw_gif.gif'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: null,
      stuff: 'stufff'
    }
  }

  componentDidMount() {
    axios
    .get('https://api.clockify.me/api/v1/user', {
      headers: {
        'X-Api-Key' : 'XPbc4lnaZRbCOFAB'
      }
    } 
    ).then(res => {
      console.log(res)
      this.setState({
        pic: res.data.profilePicture
      }) 
    }).catch(err => {
      console.log(err)
    })

    
  }


  render() {
    return (
      <div className="container">

      <h2>Josh Akeman</h2>
      <img className="profilePic" src = {this.state.pic} />
        <img src={require('./images/csw_gif.gif')} />
      </div>
    )
  } 
}

export default App;
