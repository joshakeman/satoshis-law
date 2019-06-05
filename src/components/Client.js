import React from 'react'
import '../client.css'

class Client extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timerOn: false
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.timerOn !== prevProps.timerOn) {
          this.setState({
              timerOn: this.props.timerOn
          })
        }
      }

    render() {
        return (
        <div className="client-bar">
            <div className="client-wrapper">
                <img className="client-pic" src={this.props.pic} />
                <h3>{this.props.client}</h3>
            </div>
            { this.state.timerOn
            ? <img src={require('../images/csw_gif.gif')} />
            : null }
        </div>
    )
}
}

export default Client