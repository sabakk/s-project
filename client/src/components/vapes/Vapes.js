import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VapeItem from './VapeItem';
import VapeForm from './VapeForm';
import VapeSlider from './VapeSlider';
import { getPosts } from '../../actions/vape';

const Vapes = ({ getPosts, vape: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner color="primary"/>
    ) : (
    <Fragment>
      <h1 className='large text-secondary text-center py-3'>Vapes liquars</h1>
      
      <Container>
      <VapeSlider items={posts} />
      <Row className="justify-content-around">
      <Col md="5" className="my-5 order-md-2"><VapeForm /></Col>
      <Col md="5" className="my-5 order-md-1">
        {posts.map(post => (
          <VapeItem key={post._id} post={post} />
        ))}
      </Col >
      </Row></Container>
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