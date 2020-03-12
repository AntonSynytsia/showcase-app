import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Img from 'react-image';

const AppCarouselItem = ({ item, imgIndex }) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    setImgUrl(item.url);
  }, []);

  return (
    <Img
      src={imgUrl}
      style={{
        flex: '0 0 auto',
        width: '80%',
        display: 'block',
        padding: '0 5px',
        opacity: item.index === imgIndex ? 1.0 : 0.1,
        visibility:
          item.index >= imgIndex - 2 && item.index <= imgIndex + 2
            ? 'visible'
            : 'hidden',
        transition: 'opacity, height 0.5s ease',
        //height: `scaleY(${item.index === imgIndex ? 100 : 90}%)`,
        height: item.index === imgIndex ? '100%' : '90%',
      }}
    ></Img>
  );
};

AppCarouselItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AppCarouselItem;
