import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {getUser} from "../../lib/user";

export default class NavBar extends React.Component {
  componentWillMount() {
    this.setState({user: {}});

    getUser()
      .then(user => this.setState({user}));
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            Mindfulnets
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>{this.state.user.name}</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
