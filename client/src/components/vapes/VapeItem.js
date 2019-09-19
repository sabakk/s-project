import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/vape";
import { addItem } from "../../actions/cartAction";

const VapeItem = ({
  addItem,
  addLike,
  removeLike,
  deletePost,
  auth,
  post,
  showActions
}) => {
  const {
    _id,
    brand,
    text,
    volume,
    nicotine,
    price,
    name,
    avatar,
    user,
    likes,
    comments,
    date
  } = post;
  return (
    <div className=" bg-white p-1 my-5 ">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="rounded img-thumbnail " src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div className="my-3">
        <h1>{brand && brand}</h1>
        <p>{text && text}</p>
        <p>{nicotine && nicotine}</p>
        <p>{volume && volume}</p>
        <p>{price && price + "$"}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addItem(post)}
              type="button"
              className="btn btn-success"
            >
              Add to cart
            </button>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/vape/${_id}`} class="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
VapeItem.defaultProps = {
  showActions: true
};

VapeItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost, addItem }
)(VapeItem);
