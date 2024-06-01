import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Avatar2 from '../../assets/avatar-images/Avatar-2.svg';
import Avatar3 from '../../assets/avatar-images/Avatar-3.svg';
import Avatar4 from '../../assets/avatar-images/Avatar-4.svg';
import Avatar5 from '../../assets/avatar-images/Avatar-5.svg';
import Avatar6 from '../../assets/avatar-images/Avatar-6.svg';

const testimonials = [
  { id: 1, text: "I have been using Jetpay for over a year now and I can confidently say that it has revolutionized the way I trade cryptocurrencies. The app is user-friendly and provides detailed insights into my trading activities. The support team is also incredibly responsive and helpful.", rating: 5, avatar: Avatar2, name: 'John Doe', role: 'user experience' },
  { id: 2, text: "I used to find trading cryptocurrencies quite daunting, but Jetpay has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend Jetpay to anyone looking to get started in crypto trading.", rating: 4, avatar: Avatar3, name: 'Jane Smith', role: 'user experience' },
  { id: 3, text: "As a seasoned crypto trader, I have tried many different platforms over the years. However, Jetpay stands out as one of the best I have used. It offers a wide range of features and tools that have helped me maximize my profits. The security measures are also top-notch, which gives me peace of mind when trading.", rating: 3, avatar: Avatar4, name: 'Alex Johnson', role: 'user experience' },
  { id: 4, text: "I have been using Jetpay for over a year now and I can confidently say that it has revolutionized the way I trade cryptocurrencies. The app is user-friendly and provides detailed insights into my trading activities. The support team is also incredibly responsive and helpful.", rating: 5, avatar: Avatar5, name: 'Chris Lee', role: 'user experience' },
  { id: 5, text: "I used to find trading cryptocurrencies quite daunting, but Jetpay has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend Jetpay to anyone looking to get started in crypto trading.", rating: 4, avatar: Avatar6, name: 'Pat Taylor', role: 'user experience' },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < testimonials.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mx-auto my-10">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`rounded-full flex justify-center items-center w-10 h-10 ${currentIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= testimonials.length - 3}
          className={`rounded-full flex justify-center items-center w-10 h-10 ${currentIndex >= testimonials.length - 3 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
        >
          <FaAngleRight />
        </button>
      </div>
      <div className="flex space-x-4">
        {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
          <div key={testimonial.id} className="p-4 bg-[#FAFAFA] rounded-[20px] flex-1">
            <div className="flex my-4">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.163c.969 0 1.372 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.175 0l-3.367 2.447c-.784.57-1.838-.197-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.83 9.377c-.784-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.95z" />
                </svg>
              ))}
            </div>
            <p>{testimonial.text}</p>

            <div className="flex items-center my-4">
              <img src={testimonial.avatar} alt={`${testimonial.name}'s avatar`} className="w-10 h-10 rounded-full mr-2" />
              <div>
                <span className="font-bold">{testimonial.name}</span>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
