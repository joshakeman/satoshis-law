import React from 'react';
import '../caseDropdown.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios'

export default class CaseDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      cases: [],
      caseSelected: false,
      currentCase: null
    };
  }

  componentDidMount() {
    axios
    .get('https://api.clockify.me/api/v1/workspaces/5cf6e9a6b07987371ebcf369/projects', {
      headers: {
        'X-Api-Key' : 'XPbc4lnaZRbCOFAB'
      }
    } 
    ).then(res => {
      console.log(res)
      this.setState({
        cases: res.data
      }) 
    }).catch(err => {
      console.log(err)
    })
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cases !== prevProps.cases) {
      this.setState({
        cases: [...this.state.cases, this.props.cases]
      })
    }
  }

  render() {
    return (

      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown">
        <DropdownToggle caret>
          {this.props.title}
        </DropdownToggle>
        <DropdownMenu>
          {this.state.cases.map(c => (
             <span className="dropdown-item" onClick={this.props.renderCase}><DropdownItem header>{c.name}</DropdownItem></span>
          ))}
          {/* <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

    );
  }
}