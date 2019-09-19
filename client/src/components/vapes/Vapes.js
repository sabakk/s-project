import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VapeItem from "./VapeItem";
import VapeForm from "./VapeForm";
import { getPosts } from "../../actions/vape";
import { setTextFilter, setSortVapes } from "../../actions/filterVapesAction";
import { getVisibleVapes } from "../../selectors/filterSelectors";

const Vapes = ({ getPosts, setTextFilter, setSortVapes, vape, loading }) => {
  const [text, setText] = useState("");
  const [select, setSelect] = useState("price");

  useEffect(() => {
    getPosts();
    setTextFilter(text);
    setSortVapes(select);
  }, [getPosts, setTextFilter, setSortVapes, text, select]);

  const setSearch = e => {
    e.preventDefault();
    const eText = e.target.value;
    setText(eText);
  };
  const setSort = e => {
    e.preventDefault();
    const eSelect = e.target.value;
    setSelect(eSelect);
  };
  return loading ? (
    <Spinner color="primary" />
  ) : (
    <Fragment>
      <h1 className="large text-secondary text-center py-3">Vapes liquars</h1>

      <Container>
        <Row form>
          <Col md={9}>
            <Input
              value={text}
              onChange={setSearch}
              placeholder="search by name"
            />
          </Col>
          <Col md={3}>
            <Input type="select" value={select} onChange={setSort}>
              <option>price</option>
              <option>nicotine</option>
            </Input>
          </Col>
        </Row>
        <Row className="justify-content-around">
          <Col md="5" className="my-5 order-md-2">
            <VapeForm />
          </Col>
          <Col md="5" className="my-5 order-md-1">
            {vape.map(post => (
              <VapeItem key={post._id} post={post} />
            ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Vapes.propTypes = {
  getPosts: PropTypes.func.isRequired,
  vape: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    vape: getVisibleVapes(state),
    loading: state.vape.loading
  };
};

export default connect(
  mapStateToProps,
  { getPosts, setTextFilter, setSortVapes }
)(Vapes);
