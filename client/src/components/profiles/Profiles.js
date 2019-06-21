import React, { Fragment, useEffect } from 'react';
import { Spinner,  Row, Col, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner color="primary" />      ) : (
        <Fragment>
          <h1 className='large  py-4'>Vapers profiles</h1>
          
          <Container><Row>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <Col sm="6" md="3">
                <ProfileItem key={profile._id} profile={profile} />
                </Col>
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </Row></Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);