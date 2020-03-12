import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import AppSpinner from '../AppSpinner';

const AppGalleryItem = ({ url }) => {
  return (
    <div className="card">
      <Img
        src={url}
        style={{ width: '100%', height: 'auto' }}
        loader={<AppSpinner />}
      />
    </div>
  );
};

AppGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AppGalleryItem;
