import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/profiles" />;
  }
  const resText = true;
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="pb-3">Vaping</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore,
            vitae? Fugit, eveniet. Inventore, accusantium sit?
          </p>
          <div className="d-flex justify-content-around py-5">
            <div className=" btn btn-outline-success ">
              <Login resText={resText} />
            </div>
            <div className=" btn btn-outline-primary ">
              <Register resText={resText} />
            </div>
          </div>
        </div>
      </div>
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
