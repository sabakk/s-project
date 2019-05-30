import React, { Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
  import {NavLink as NL} from 'react-router-dom';
  import { connect } from 'react-redux';
  import { logout } from '../../actions/authActions';

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
        <NavLink tag={NL} to='/profiles'>Developers</NavLink>
      </NavItem>   
      <NavItem>
        <NavLink tag={NL} to="/login">Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={NL} to='/register' >Signup</NavLink>
      </NavItem>
      </Fragment>
      )

      const authLinks = (
      <Fragment>
      <NavItem>
        <NavLink tag={NL} to='/profiles'>Developers</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={NL} to='/posts'>Posts</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={NL}  to='/dashboard'>Dashboard</NavLink>
      </NavItem>
      <NavItem>
      <NavLink tag={NL} onClick={this.props.logout} to='/'>Logout</NavLink>
      </NavItem>
      </Fragment>
      )

      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand tag={NL} to="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              {<Fragment>{this.props.auth.isAuthenticated ? authLinks : guestLinks}</Fragment>}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps, { logout })(NavBar)