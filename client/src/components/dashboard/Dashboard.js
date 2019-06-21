import React, { Fragment, useEffect } from 'react';
import { Spinner, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';


const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner color="danger" />
    ) : (
    <Container>
      <Row>
        <Col md="6" className=''>
        <h1 className='py-3 text-secondary text-center'>Dashboard</h1>
        <div className='d-flex flex-column justify-content-around align-items-center h-50'>
      <h2 >
        <i className='fas fa-user' /> Welcome {user && user.name}
      </h2>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className=''>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
      </div>
        </Col>
        <Col md="6" className='d-none d-md-block'>
          <div className='dashboard-img'></div>
        </Col>
      </Row>
     
    </Container>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);