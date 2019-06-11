import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import VapeItem from './VapeItem';
import VapeForm from './VapeForm';
import { getPosts } from '../../actions/vape';

const Vapes = ({ getPosts, vape: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner color="primary"/>
    ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <VapeForm />
      <div className='posts'>
        {posts.map(post => (
          <VapeItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Vapes.propTypes = {
  getPosts: PropTypes.func.isRequired,
  vape: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vape: state.vape
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Vapes);