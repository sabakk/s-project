import React, { Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as NL } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

import Login from "../auth/Login";
import Register from "../auth/Register";
import CartIcon from "../cart/CartIcon";
class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink tag={NL} to="/profiles">
            Profiles
          </NavLink>
        </NavItem>
        <NavItem>
          {/* <NavLink tag={NL} to="/login">Login</NavLink> */}
          <Login />
        </NavItem>
        <NavItem>
          <Register />
        </NavItem>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>
              {this.props.auth.user
                ? `Welcome ${this.props.auth.user.name} |`
                : ""}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink tag={NL} to="/vapes">
            Vapes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NL} to="/profiles">
            Profiles
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NL} to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NL} onClick={this.props.logout} to="/">
            <i className="fas fa-sign-out-alt" /> <span>Logout</span>
          </NavLink>
        </NavItem>
        <NavItem
          className="cart-logo-wrapper"
          onClick={this.props.toggleCartHidden}
        >
          <CartIcon />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark " dark expand="md" className="navb ">
          <div className="container">
            <NavbarBrand tag={NL} to="/">
              Vaping
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {
                  <Fragment>
                    {this.props.auth.isAuthenticated ? authLinks : guestLinks}
                  </Fragment>
                }
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
