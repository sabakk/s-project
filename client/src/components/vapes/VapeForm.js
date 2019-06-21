import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/vape';
import { Form as FM, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import {Button, Form, FormGroup, Label, Input, Spinner, 
  UncontrolledAlert} from 'reactstrap';

class MyForm extends React.Component {
 

  render() {
    const { handleSubmit } = this.props;
   
    return (
      <div className="sticky-top py-5 ">
      
         <h1> Vape Liquare</h1>
          { this.props.alerts !== null && this.props.alerts.length > 0 && this.props.alerts.map(alert => (
     
      <UncontrolledAlert  key={alert.id}  color={alert.alertType} >
      {alert.msg}
    </ UncontrolledAlert >))}
          <Form tag={FM} onSubmit={handleSubmit} >
   
          <FormGroup>
          <Label for="brand">Brand name</Label>
          <Input tag={Field} type="text"  name="brand"  />
          <ErrorMessage name="brand" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <Label for="text">Text</Label>
          <Input tag={Field} type="textarea" name="text"  />
          <ErrorMessage name="text" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <Label for="volume">Volume</Label>
          <Input tag={Field} component="select"   name="volume"  >
            <option value="10 ml">10 ml</option>
            <option value="50 ml">50 ml</option>
            <option value="100 ml">100 ml</option>
          </Input>
          <ErrorMessage name="volume" component="div" className="text-danger" />
        </FormGroup>
        <FormGroup>
          <Label for="nicotine">Nicotine</Label>
          <Input tag={Field} component="select"   name="nicotine"  >
            <option value="0,3 mg">0,3 mg</option>
            <option value="0,6 mg">0,6 mg</option>
            <option value="1,2 mg">1,2 mg</option>
          </Input>
          <ErrorMessage name="nicotine" component="div" className="text-danger" />
        </FormGroup>

      <Button color="primary"  block type="submit" disabled={this.props.vape.loading} onClick={this.toggle}> 
      {this.props.vape.loading ? <Spinner color="secondary" size="sm" /> : 'Submit' }</Button>
     
      </Form >
        
      </div>
    );
  }
}

// const MyForm = props => {
//     const {
//       handleSubmit
//       } = props;
  
    
//     return (
     
//       <Form tag={FM} onSubmit={handleSubmit} className="mt-3">
       
//       {/* { props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => (
//         <Alert key={alert.id}  color={alert.alertType} >
//         {alert.msg}
//       </Alert>))
//       } */}
  
//         <h2>Create Your Profile </h2>
        
//         <FormGroup>
//           <Label for="brand">Brand name</Label>
//           <Input tag={Field} type="text"  name="brand"  />
//           <ErrorMessage name="brand" component="div" className="text-danger" />
//         </FormGroup>
//         <FormGroup>
//           <Label for="text">text</Label>
//           <Input tag={Field} type="text"  name="text"  />
//           <ErrorMessage name="text" component="div" className="text-danger" />
//         </FormGroup>
//         <FormGroup>
//           <Label for="volume">Volume</Label>
//           <Input tag={Field} component="select"   name="volume"  >
//             <option value="10 ml">10 ml</option>
//             <option value="50 ml">50 ml</option>
//             <option value="100 ml">100 ml</option>
//           </Input>
//           <ErrorMessage name="volume" component="div" className="text-danger" />
//         </FormGroup>
//         <FormGroup>
//           <Label for="nicotine">Nicotine</Label>
//           <Input tag={Field} component="select"   name="nicotine"  >
//             <option value="0,3 mg">0,3 mg</option>
//             <option value="0,6 mg">0,6 mg</option>
//             <option value="1,2 mg">1,2 mg</option>
//           </Input>
//           <ErrorMessage name="nicotine" component="div" className="text-danger" />
//         </FormGroup>
//         <Button type="submit">Submit </Button>
  
//       </Form >
//     );
//   };
  
  const VapeForm = withFormik({
  
    mapPropsToValues: props => ({  
    brand: '',
    text: '',
    volume: '10 ml',
    nicotine: '0,3 mg',
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
  
  const mapStateToProps = state => ({
    alerts: state.alert,
    vape: state.vape
  });

  export default connect(mapStateToProps, { addPost })(VapeForm);