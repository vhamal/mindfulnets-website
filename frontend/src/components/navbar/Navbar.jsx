import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import userName from "../../lib/userName";

export default class NavBar extends React.Component {
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
          <NavItem>{userName()}</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
