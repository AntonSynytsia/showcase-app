import React, { Fragment, useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import AppCarouselItem from './AppCarouselItem';

const AppCarousel = props => {
  const [items, setItems] = useState([]);

  const [imgIndex, setImgIndex] = useState(0);

  const itemDiv = createRef();

  useEffect(() => {
    const urls = [];
    for (let i = 0; i <= 100; i += 1) {
      urls.push({
        index: i,
        id: 'psk' + i,
        url: `https://picsum.photos/id/${i * 2 + 10}/800/600`,
      });
    }
    setItems(urls);
  }, []);

  const handleClickLeft = e => {
    e.preventDefault();
    e.stopPropagation();

    setImgIndex(i => {
      const ni = i <= 0 ? 0 : i - 1;
      //   itemDiv.current.style.transform = `translateX(-${ni * 5}%)`;
      return ni;
    });
  };

  const handleClickRight = e => {
    e.preventDefault();
    e.stopPropagation();

    setImgIndex(i => {
      const ni = i >= 99 ? 99 : i + 1;
      //   itemDiv.current.style.transition = `left 0.5s ease`;
      return ni;
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50px 1fr 50px',
        columnGap: '3px',
        height: '100%',
      }}
    >
      <div
        onClick={handleClickLeft}
        style={{
          backgroundColor: '#fafafa',
          textAlign: 'center',
          border: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div
        style={{
          border: '0',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}
        ref={itemDiv}
      >
        <div
          style={{
            position: 'relative',
            transition: 'transform 0.5s ease',
            transform: `translateX(${-80 * imgIndex + 10}%)`,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: '100%',
          }}
        >
          {items.map(item => {
            return (
              <AppCarouselItem item={item} key={item.id} imgIndex={imgIndex} />
            );
          })}
        </div>
      </div>
      <div
        onClick={handleClickRight}
        style={{
          backgroundColor: '#fafafa',
          textAlign: 'center',
          border: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};

AppCarousel.propTypes = {};

export default AppCarousel;
