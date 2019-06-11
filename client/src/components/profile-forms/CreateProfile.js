import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';
import { connect } from 'react-redux';
import {createProfile } from '../../actions/profile'



const MyForm = props => {
  const {
    handleSubmit
    } = props;

  
  return (
   
    <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
     
    { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
      <Alert key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </Alert>))
    }

      <h2>Create Your Profile </h2>
      
      <FormGroup>
        <Label for="company">Company</Label>
        <Input tag={Field} type="text"  name="company"  />
        <ErrorMessage name="company" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="website">Website</Label>
        <Input tag={Field} type="text"  name="website"  />
        <ErrorMessage name="website" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input tag={Field} type="text"  name="location"  />
        <ErrorMessage name="location" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input tag={Field} type="text"  name="status"  />
        <ErrorMessage name="status" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="skills">Skills</Label>
        <Input tag={Field} type="text"  name="skills"  />
        <ErrorMessage name="skills" component="div" className="text-danger" />
      </FormGroup>
  
     
      <Button type="submit" disabled={props.profile.loading} >Submit 
      {props.profile.loading ? <Spinner color="primary" size="sm"/> : null }</Button>
      <Link className='btn btn-light my-1' to='/dashboard'> Go Back </Link>

     
    </Form >
  );
};

const CreateProfile = withFormik({

  mapPropsToValues: props => ({  
  company: '',
  website: '',
  location: '',
  status: '',
  skills: ''
}),
  validationSchema: Yup.object().shape({
      // email: Yup.string().email('Invalid email address').required('Email is required'),
  }),

  handleSubmit: (  values,  { props } ) => {
      props.createProfile(values, props.history)
  },
})(MyForm);

const mapStateToProps = state => ({
  alerts: state.alert,
  profile: state.profile
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));