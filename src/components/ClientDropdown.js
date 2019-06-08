import React from 'react';
import '../dropdown.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ClientDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      client: []
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.client !== prevProps.client) {
      this.setState({
        client: [...this.state.client, this.props.client]
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
          {this.state.client.map(client => (
             <span className="dropdown-item" onClick={this.props.clickPete}><DropdownItem header>{client}</DropdownItem></span>
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