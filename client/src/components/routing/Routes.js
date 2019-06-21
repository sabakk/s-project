import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container} from 'reactstrap'

import NotFound from '../layout/NotFound'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import Profiles from '../profiles/Profiles'
import Profile from '../profiles/Profile'
import Vapes from '../vapes/Vapes'
import Vape from '../vapes/Vape'

export default function Routes() {
    return (
    <Container className='main'>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/vapes' component={Vapes} />
          <PrivateRoute exact path='/vape/:id' component={Vape} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route  component={NotFound} />
        </Switch>
    </Container>
    )
}
