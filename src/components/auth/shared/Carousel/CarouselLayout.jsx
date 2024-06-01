import React from 'react';
import Carousel from './Carousel';
import image1 from '../../../../assets/get-started-jetpay-frame.png'; 
import image2 from '../../../../assets/get-started-jetpay-frame2.png'; 
import './carousel.css';

const carouselItems = [
  {
    image: image1,
    title: 'Get Started with Jet Support',
    description: 'Enjoy the exhilaration of seamless interactions with our user-friendly platform, providing you with convenience and ease, all powered by Jet Support.',
  },
  {
    image: image2,
    title: 'Join a Thriving Valuable Community',
    description: "Connect with fellow users and gain valuable insights from experts through Jet Support's dynamic social platform for interactive discussions and knowledge sharing",
  },
  // Add more items as needed
];

const CarouselLayout = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <Carousel items={carouselItems} />
    </div>
  );
};

export default CarouselLayout;
