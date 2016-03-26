import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {getUserId} from "../../lib/user";

export default class NavBar extends React.Component {
  componentWillMount() {
    this.setState({});

    getUserId()
      .then(userId => this.setState({ userId }));
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
          <NavItem>{this.state.userId}</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
