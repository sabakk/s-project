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
import Login from './components/routes/Login'
import Register from './components/routes/Register'

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