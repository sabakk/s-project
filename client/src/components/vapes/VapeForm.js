import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/vape';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input  } from 'reactstrap';

const MyForm = props => {
    const {
      handleSubmit
      } = props;
  
    
    return (
     
      <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
       
      {/* { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
        <Alert key={alert.id}  color={alert.alertType} >
        {alert.msg}
      </Alert>))
      } */}
  
        <h2>Create Your Profile </h2>
        
        <FormGroup>
          <Label for="text">text</Label>
          <Input tag={Field} type="text"  name="text"  />
          <ErrorMessage name="text" component="div" className="text-danger" />
        </FormGroup>
        {/* <FormGroup>
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
        </FormGroup> */}
    
       
        <Button type="submit">Submit </Button>
  
       
      </Form >
    );
  };
  
  const VapeForm = withFormik({
  
    mapPropsToValues: props => ({  
    text: ''
    // website: '',
    // location: '',
    // status: '',
    // skills: ''
  }),
    validationSchema: Yup.object().shape({
        // email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
  
    handleSubmit: (  values,  { props } ) => {
        props.addPost(values)
    },
  })(MyForm);

  VapeForm.propTypes = {
    addPost: PropTypes.func.isRequired
  };
  
  export default connect(null, { addPost })(VapeForm);