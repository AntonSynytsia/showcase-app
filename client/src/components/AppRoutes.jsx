import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import AppNavbar from './AppNavbar';
import AppLogin from './AppLogin';
import AppRegister from './AppRegister';
import AppDashboard from './AppDashboard';
import AppMembers from './AppMembers';
import AppGallery from './gallery/AppGallery';
import AppTodos from './todo/AppTodos';
import AppAddTodo from './todo/AppAddTodo';
import AppUsers from './users/AppUsers';
import AppCarousel from './carousel/AppCarousel';
// import ReactCircles from './d3/ReactCircles';

import { TodoProvider } from '../context/TodoContext';
import { AuthProvider } from '../context/AuthContext';

const AppRoutes = props => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <AppNavbar />

          <Container>
            <Switch>
              <Route path="/members">
                <AppMembers />
              </Route>
              <Route path="/login">
                <AppLogin />
              </Route>
              <Route path="/register">
                <AppRegister />
              </Route>

              <Route path="/gallery">
                <AppGallery />
              </Route>
              <Route path="/carousel">
                <AppCarousel />
              </Route>
              <Route path="/todos">
                <AppAddTodo />
                <AppTodos />
              </Route>
              {/* <Route path="/d3">
                <ReactCircles />
              </Route> */}
              <Route path="/sample_users">
                <AppUsers />
              </Route>
              <Route path="/">
                <AppDashboard />
              </Route>
            </Switch>
          </Container>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

AppRoutes.propTypes = {};

export default AppRoutes;
