import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment  } from '../../actions/vape';
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
  
        <h2>Add comment </h2>
        
        <FormGroup>
          <Label for="text">text</Label>
          <Input tag={Field} type="text"  name="text"  />
          <ErrorMessage name="text" component="div" className="text-danger" />
        </FormGroup>
   
        <Button type="submit">Submit </Button>
  
      </Form >
    );
  };
  
  const CommentForm = withFormik({
  
    mapPropsToValues: props => ({  
    text: ''
  }),
    validationSchema: Yup.object().shape({
        // email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
  
    handleSubmit: (  values,  { props } ) => {
        props.addComment(props.postId, values )
    },
  })(MyForm);

  CommentForm.propTypes = {
    addComment : PropTypes.func.isRequired
  };
  
  export default connect(null, { addComment  })(CommentForm);