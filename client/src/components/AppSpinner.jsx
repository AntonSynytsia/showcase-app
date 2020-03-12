import React from 'react';
import { Spinner } from 'reactstrap';

const AppSpinner = props => {
  return (
    <Spinner
      style={{
        verticalAlign: 'middle',
      }}
      color="secondary"
    />
  );
};

AppSpinner.propTypes = {};

export default AppSpinner;
