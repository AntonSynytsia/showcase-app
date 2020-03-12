import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import AppAddTodo from './todo/AppAddTodo';
import AppTodos from './todo/AppTodos';
import AppGallery from './gallery/AppGallery';
import AppUsers from './users/AppUsers';
import AppCarousel from './carousel/AppCarousel';

const AppDashboard = () => {
  return (
    <Fragment>
      <h1 className="display-4">Welcome</h1>
    </Fragment>
  );
};

AppDashboard.propTypes = {};

export default AppDashboard;
