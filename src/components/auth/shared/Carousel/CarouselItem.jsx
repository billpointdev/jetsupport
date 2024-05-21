import React from 'react';
import PropTypes from 'prop-types';
import './carousel.css';

const CarouselItem = ({ item, isActive }) => {
  return (
    <div className={`carousel-item ${isActive ? 'active' : ''}`}>
      <img src={item.image} alt={item.title} />
      <div className="carousel-item-content">
        <h3 className='font-bold text-[20px]'>{item.title}</h3>
        <p className='font-[400] font-inter'>{item.description}</p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CarouselItem;
