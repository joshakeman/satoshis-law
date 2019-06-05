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
            <div>
                <h4>{this.props.client}</h4>
                <img className="client-pic" src={this.props.pic} />
            </div>
            { this.state.timerOn
            ? <img src={require('../images/csw_gif.gif')} />
            : null }
        </div>
    )
}
}

export default Client