import React, {useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input, Spinner  } from 'reactstrap';
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
     
    {/* { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
      <Alert key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </Alert>))
    } */}

      <h2>Create Your Profile </h2>
      
      <FormGroup>
        <Label for="old">How old are you?</Label>
        <Input tag={Field} type="number"  name="old"  />
        <ErrorMessage name="old" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="years">How long you are smoking?</Label>
        <Input tag={Field} component="select"  name="years"  >
            <option value="less then 1 year">less then 1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="4 years">4 years</option>
            <option value="more then 5 years">more then 5 years</option>
        </Input>
        <ErrorMessage name="years" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="status">Do you want stop smoking?</Label>
        <Input tag={Field} component="select"  name="status"  >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </Input>
        <ErrorMessage name="status" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="skills">What brand of cigarettes do you smoke</Label>
        <Input tag={Field} type="text"  name="skills"  placeholder="Marlboro, Camel, Winston"/>
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
  old: props.profile.profile.old,
  years: props.profile.profile.years,
  status: props.profile.profile.status,
  skills: props.profile.profile.skills
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