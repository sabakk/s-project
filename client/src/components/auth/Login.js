import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner  } from 'reactstrap';
import { connect } from 'react-redux';
import {login} from '../../actions/authActions'


const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{6,}$/



const MyForm = props => {
  const {
    handleSubmit
    } = props;

  if (props.auth.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
   
    <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
     
    { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
      <Alert key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </Alert>))
    }

      <h2>Login Form </h2>
      
      <FormGroup>
        <Label for="email">Email</Label>
        <Input tag={Field} type="email"  name="email"  />
        <ErrorMessage name="email" component="div" className="text-danger" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input tag={Field}  type="password" name="password" />
        <ErrorMessage name="password" component="div" className="text-danger" />
      </FormGroup>
      <Button type="submit" disabled={props.auth.loading} >Submit 
      {props.auth.loading ? <Spinner color="primary" size="sm"/> : null }</Button>
     
    </Form >
  );
};

const Login = withFormik({

  mapPropsToValues: props => ({ email: '', password: '' }),
  validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().matches(passwordPattern, 'Password is not elligible').required('Password is required'),
  }),

  handleSubmit: (  values,  { props } ) => {
      props.login(values)
  },
})(MyForm);

const mapStateToProps = state => ({
  alerts: state.alert,
  auth: state.auth
});

export default connect(mapStateToProps, {login})(Login);