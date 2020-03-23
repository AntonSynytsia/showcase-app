import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink as RRNavLink,
} from 'react-router-dom';

const AppNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" className="mb-3">
      <NavbarBrand exact to="/" tag={RRNavLink}>
        Sample
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavLink
            exact
            to="/sample_users"
            tag={RRNavLink}
            activeClassName="active"
          >
            Sample Users
          </NavLink>
          <NavLink
            exact
            to="/carousel"
            tag={RRNavLink}
            activeClassName="active"
          >
            Carousel
          </NavLink>
          <NavLink exact to="/gallery" tag={RRNavLink} activeClassName="active">
            Gallery
          </NavLink>
          <NavLink exact to="/todos" tag={RRNavLink} activeClassName="active">
            Todos
          </NavLink>
          {/* <NavLink exact to="/d3" tag={RRNavLink} activeClassName="active">
            D3
          </NavLink> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavLink exact to="/members" tag={RRNavLink} activeClassName="active">
            Members
          </NavLink>
          <NavLink exact to="/login" tag={RRNavLink} activeClassName="active">
            Login
          </NavLink>
          <NavLink
            exact
            to="/register"
            tag={RRNavLink}
            activeClassName="active"
          >
            Register
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {};

export default AppNavbar;
