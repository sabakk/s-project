import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardImg,
  CardText,
  CardTitle
} from "reactstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    status,
    skills,
    years,
    date,
    user: { _id, name, avatar }
  }
}) => {
  return (
    <div>
      <Card className="m-4">
        <CardImg src={avatar} alt="" className="rounded img-thumbnail" />
        <div>
          <CardTitle>{name}</CardTitle>
          <CardText>{status}</CardText>
          <Moment format="YYYY/MM/DD">{date}</Moment>
          <br />
          <Link to={`/profile/${_id}`} className="btn btn-dark">
            View Profile
          </Link>
        </div>
        <ListGroup>
          {skills.slice(0, 4).map((skill, index) => (
            <ListGroupItem key={index} className="">
              <i className="fas fa-check" /> {skill}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
