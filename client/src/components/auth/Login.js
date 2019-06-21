import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Spinner, 
UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import {login} from '../../actions/authActions'


const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{6,}$/

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
    
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.auth.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div >

        <NavLink onClick={this.toggle} href='#' className={this.props.resText ? "text-reset font-weight-bold" : ''}>
          <div className="">Login</div>
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          { this.props.alerts !== null && this.props.alerts.length > 0 && this.props.alerts.map(alert => (
     
      <UncontrolledAlert  key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </ UncontrolledAlert >))}
          <ModalBody>
          <Form tag={FM} onSubmit={handleSubmit} >
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
      <Button color="primary"  block type="submit" disabled={this.props.auth.loading} > 
      {this.props.auth.loading ? <Spinner color="secondary" size="sm" /> : 'Submit' }</Button>
     
      </Form >
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// const MyForm = props => {
//   const {
//     handleSubmit
//     } = props;

  // if (props.auth.isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }
//   return (
   
//     <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
     

//       <h2>Login Form </h2>
      
    //   <FormGroup>
    //     <Label for="email">Email</Label>
    //     <Input tag={Field} type="email"  name="email"  />
    //     <ErrorMessage name="email" component="div" className="text-danger" />
    //   </FormGroup>
    //   <FormGroup>
    //     <Label for="password">Password</Label>
    //     <Input tag={Field}  type="password" name="password" />
    //     <ErrorMessage name="password" component="div" className="text-danger" />
    //   </FormGroup>
    //   <Button type="submit" disabled={props.auth.loading} >Submit 
    //   {props.auth.loading ? <Spinner color="primary" size="sm"/> : null }</Button>
     
    // </Form >
//   );
// };

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