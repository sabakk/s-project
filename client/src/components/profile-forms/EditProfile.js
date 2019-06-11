import React, {useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';
import { connect } from 'react-redux';
import {createProfile, getCurrentProfile } from '../../actions/profile'



const MyForm = props => {
  const {
    handleSubmit
    } = props;

    useEffect(() => {
        getCurrentProfile();
      }, [props.profile.loading, props.getCurrentProfile]);
    

  return (
   
    <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
     
    { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
      <Alert key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </Alert>))
    }

      <h2>Create Your Profile </h2>
      
      <FormGroup>
        <Label for="from">From</Label>
        <Input tag={Field} type="date"  name="from"  />
        <ErrorMessage name="from" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="to">To</Label>
        <Input tag={Field} type="date"  name="to"  />
        <ErrorMessage name="to" component="div" className="text-danger" />
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

const EditProfile = withFormik({

  mapPropsToValues: props => ({  
  // company: '',
  // website: '',
  // location: '',
  status: props.profile.profile.status,
  skills: props.profile.profile.status,
  from: '',
  to: ''
}),
  validationSchema: Yup.object().shape({
      // email: Yup.string().email('Invalid email address').required('Email is required'),
  }),
  handleSubmit: (  values,  { props } ) => {
      props.createProfile(values, props.history, true)
  },
})(MyForm);

const mapStateToProps = state => ({
  alerts: state.alert,
  profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));