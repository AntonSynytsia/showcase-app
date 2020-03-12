import React from 'react';

import AppGalleryItem from './AppGalleryItem';

const AppGallery = props => {
  const urls = [
    'https://i.picsum.photos/id/100/200/200.jpg',
    'https://i.picsum.photos/id/1/200/200.jpg',
    'https://i.picsum.photos/id/2/200/200.jpg',
    'https://i.picsum.photos/id/3/200/200.jpg',
    'https://i.picsum.photos/id/4/200/200.jpg',
    'https://i.picsum.photos/id/5/200/200.jpg',
    'https://i.picsum.photos/id/6/200/200.jpg',
    'https://i.picsum.photos/id/7/200/200.jpg',
    'https://i.picsum.photos/id/8/200/200.jpg',
  ];

  return (
    <div className="scrolling-wrapper-flexbox">
      {urls.map((url, index) => (
        <AppGalleryItem key={'gal' + index.toString()} url={url} />
      ))}
    </div>
  );
};

AppGallery.propTypes = {};

export default AppGallery;
