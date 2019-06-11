import React, {useEffect} from 'react'
import './App.css'
import { Container, Row, Col } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import {setAuthToken} from './services/api'
import {auth} from './actions/authActions'

import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import Vapes from './components/vapes/Vapes'


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  
  useEffect(() => {
    store.dispatch(auth());
  }, []);
  
  return (
    <Provider store={store}>
    <Router>
      <div>
        <NavBar />
            <Container>
          <Row className="justify-content-center">
            <Col xs="6" >
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            </Col>
          </Row>
         
        
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/vapes' component={Vapes} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
          </Switch>
          {/* <Route exact path="/not-found" component={NotFound} /> */}
        </Container>
        {/* <Footer /> */}
        </div>
    </Router>
  </Provider>
  )
}

export default App