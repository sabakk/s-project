import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to='/profiles' />;
  };
  return (
    <div>
      <Jumbotron className="my-5">
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <div className="d-flex justify-content-around mt-5">
          <Button color="primary" size="lg" tag={Link} to="/login">Login</Button>
          <Button color="info" size="lg" tag={Link} to='/register'>SignUp</Button>
        </div>
      </Jumbotron>
    </div>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);