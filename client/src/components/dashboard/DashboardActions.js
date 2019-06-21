import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div >
      <Link to='/edit-profile' className='btn btn-success'>
        <i className='fas fa-user-circle ' /> Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActions;