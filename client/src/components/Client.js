import React from 'react'
import '../client.css'
import { Container, Row, Col } from 'reactstrap';


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
        <Container>
            <Row>
                <Col md="4" className="client-box">
                    <img className="client-pic" src={this.props.pic} />
                    <h3>{this.props.client}</h3>                
                </Col>
                <Col md="8" className="progress-column">
                { this.state.timerOn
                    ? <img className="CSW-gif" src={require('../images/csw_gif.gif')} />
                    : null }
                </Col>
            </Row>
        </Container>
            
        // <div className="client-bar">
        //     <div className="client-wrapper">
        //         <img className="client-pic" src={this.props.pic} />
        //         <h3>{this.props.client}</h3>
        //     </div>
        //     { this.state.timerOn
        //     ? <img src={require('../images/csw_gif.gif')} />
        //     : null }
        // </div>
    )
}
}

export default Client