import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Spinner, 
UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import {register} from '../../actions/authActions'


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
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Registration Form</ModalHeader>
          { this.props.alerts !== null && this.props.alerts.length > 0 && this.props.alerts.map(alert => (
      <UncontrolledAlert  key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </ UncontrolledAlert >))}
          <ModalBody>
          <Form tag={FM} onSubmit={handleSubmit} >
      <FormGroup>
        <Label for="name">Name</Label>
        <Input tag={Field} type="text"  name="name"  />
        <ErrorMessage name="name"  component="div" className="text-danger"/>
      </FormGroup>
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
      <FormGroup>
        <Label for="confirm">Confirm Password</Label>
        <Input tag={Field}  type="password" name="confirm"  />
        <ErrorMessage name="confirm" component="div" className="text-danger"/>
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
//     handleSubmit,
//     isSubmitting
//   } = props;

//   if (props.isAuthenticated) {
//     return <Redirect to='/dashboard' />;
//   }
//   return (
   
//     <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
     
//     { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
//       <Alert key={alert.id}  color={alert.alertType} >
//       {alert.msg}
//     </Alert>))
//     }

//       <h2>Registration Form </h2>
//       <FormGroup>
//         <Label for="name">Name</Label>
//         <Input tag={Field} type="text"  name="name"  />
//         <ErrorMessage name="name"  component="div" className="text-danger"/>
//       </FormGroup>
//       <FormGroup>
//         <Label for="email">Email</Label>
//         <Input tag={Field} type="email"  name="email"  />
//         <ErrorMessage name="email"  component="div" className="text-danger"/>
//       </FormGroup>
//       <FormGroup>
//         <Label for="password">Password</Label>
//         <Input tag={Field}  type="password" name="password" />
//         <ErrorMessage  name="password" component="div" className="text-danger" />
//       </FormGroup>
//       <FormGroup>
//         <Label for="confirm">Confirm Password</Label>
//         <Input tag={Field}  type="password" name="confirm"  />
//         <ErrorMessage name="confirm" component="div" className="text-danger"/>
//       </FormGroup>
//       <Button type="submit" disabled={isSubmitting} >Submit</Button>
     
//     </Form >
//   );
// };

const Register = withFormik({

  mapPropsToValues: props => ({ name: '', email: '', password: '', confirm: '' }),
  validationSchema: Yup.object().shape({
      name: Yup.string().max(20, 'Do not enter a huge name').min(3, 'Do not enter a tiny name').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().matches(passwordPattern, 'Password is not elligible').required('Password is required'),
      confirm: Yup.string().oneOf([Yup.ref('password') ], 'Please enter a similar password').required('Please confirm your password'),
  }),

  handleSubmit: (  values,  { props, setSubmitting } ) => {
      //  setSubmitting(false)
      props.register(values)

  },

})(MyForm);

const mapStateToProps = state => ({
  alerts: state.alert,
  auth: state.auth
});

export default connect(mapStateToProps, {register})(Register);