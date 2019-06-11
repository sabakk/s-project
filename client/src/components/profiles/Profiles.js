import React, { Fragment, useEffect } from 'react';
import { Spinner,  CardGroup } from 'reactstrap';
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
          <h1 className='large text-primary'>Profiles</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <CardGroup>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </CardGroup>
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