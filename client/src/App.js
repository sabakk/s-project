import React, {Component} from 'react'
import './App.scss'
import { UncontrolledAlert} from 'reactstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {setAuthToken} from './services/api'
import {auth} from './actions/authActions'

import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'



if(localStorage.token) {
  setAuthToken(localStorage.token)
}

class PApp extends Component {

  componentDidMount() {
    this.props.auth()
  }

  render() {
  return (
    <BrowserRouter>
      <div className='grail'>
        <NavBar />
        {
           this.props.alerts !== null && this.props.alerts.length > 0 && this.props.alerts.map(alert => ( 
      <UncontrolledAlert  key={alert.id}  color={alert.alertType} className='m-0'>
      {alert.msg}
    </ UncontrolledAlert >))
         }
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact component={Routes} />
          </Switch>
        <Footer />
        </div>
    </BrowserRouter>
  )
}
}

const mapStateToProps = state => ({
  alerts: state.alert,
});

 const App = connect(mapStateToProps, {auth})(PApp)
 export default App