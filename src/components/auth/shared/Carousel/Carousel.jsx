import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselItem from './CarouselItem';
import './carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 10000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [items.length]);

  return (
    <div className="carousel">
      <div
        className="carousel-content"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            item={item}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
