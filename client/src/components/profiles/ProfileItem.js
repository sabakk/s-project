import React from 'react';
import { ListGroup, ListGroupItem, Card, CardImg, CardText, CardTitle } from 'reactstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    status,
    skills,
    from,
    to,
    user: { _id, name, avatar }
  }
}) => {
  return (
    <div >
    <Card className="m-5 w-50">
    <CardImg src={avatar} alt='' className='round-img' />
     <div>
        <CardTitle>{name}</CardTitle>
        <CardText>
          {status} 
        </CardText>
       <Moment format='YYYY/MM/DD'>{from}</Moment> - {' '} {!to ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
       
       <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ListGroup>
        {skills.slice(0, 4).map((skill, index) => (
          <ListGroupItem key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
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