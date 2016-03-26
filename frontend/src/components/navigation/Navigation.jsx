import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {getUser} from "../../lib/user";

export default class NavBar extends React.Component {
  componentWillMount() {
    this.setState({user: {}});

    getUser()
      .then(user => user.name)
      .then(userName => this.setState({userName}));
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
          <NavItem>{this.state.userName}</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
