// import React, { useState } from 'react';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
// import Avatar2 from '../../assets/avatar-images/Avatar-2.svg';
// import Avatar3 from '../../assets/avatar-images/Avatar-3.svg';
// import Avatar4 from '../../assets/avatar-images/Avatar-4.svg';
// import Avatar5 from '../../assets/avatar-images/Avatar-5.svg';
// import Avatar6 from '../../assets/avatar-images/Avatar-6.svg';

// const testimonials = [
//   { id: 1, text: "I have been using JetSupport for over a year now and I can confidently say that it has revolutionized the way I trade cryptocurrencies. The app is user-friendly and provides detailed insights into my trading activities. The support team is also incredibly responsive and helpful.", rating: 5, avatar: Avatar2, name: 'John Doe', role: 'user experience' },
//   { id: 2, text: "I used to find trading cryptocurrencies quite daunting, but JetSupport has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend JetSupport to anyone looking to get started in crypto trading.", rating: 4, avatar: Avatar3, name: 'Jane Smith', role: 'user experience' },
//   { id: 3, text: "As a seasoned crypto trader, I have tried many different platforms over the years. However, JetSupport stands out as one of the best I have used. It offers a wide range of features and tools that have helped me maximize my profits. The security measures are also top-notch, which gives me peace of mind when trading.", rating: 3, avatar: Avatar4, name: 'Alex Johnson', role: 'user experience' },
//   { id: 4, text: "I have been using JetSupport for over a year now and I can confidently say that it has revolutionized the way I trade cryptocurrencies. The app is user-friendly and provides detailed insights into my trading activities. The support team is also incredibly responsive and helpful.", rating: 5, avatar: Avatar5, name: 'Chris Lee', role: 'user experience' },
//   { id: 5, text: "I used to find trading cryptocurrencies quite daunting, but JetSupport has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend JetSupport to anyone looking to get started in crypto trading.", rating: 4, avatar: Avatar6, name: 'Pat Taylor', role: 'user experience' },
// ];

// const Testimonial = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex < testimonials.length - 3) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="mx-auto my-10">
//       <div className="flex justify-end gap-4 mb-4">
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           className={`rounded-full flex justify-center items-center w-10 h-10 ${currentIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
//         >
//           <FaAngleLeft />
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex >= testimonials.length - 3}
//           className={`rounded-full flex justify-center items-center w-10 h-10 ${currentIndex >= testimonials.length - 3 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white'}`}
//         >
//           <FaAngleRight />
//         </button>
//       </div>
//       <div className="flex space-x-4">
//         {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
//           <div key={testimonial.id} className="p-4 bg-[#FAFAFA] rounded-[20px] flex-1">
//             <div className="flex my-4">
//               {Array.from({ length: 5 }, (_, i) => (
//                 <svg
//                   key={i}
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.163c.969 0 1.372 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.175 0l-3.367 2.447c-.784.57-1.838-.197-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.83 9.377c-.784-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.95z" />
//                 </svg>
//               ))}
//             </div>
//             <p>{testimonial.text}</p>

//             <div className="flex items-center my-4">
//               <img src={testimonial.avatar} alt={`${testimonial.name}'s avatar`} className="w-10 h-10 rounded-full mr-2" />
//               <div>
//                 <span className="font-bold">{testimonial.name}</span>
//                 <p>{testimonial.role}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonial;

import React from "react";
import KeenSlider from "https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm";
import Avatar2 from "../../assets/avatar-images/Avatar-2.svg";
import Avatar3 from "../../assets/avatar-images/Avatar-3.svg";
import Avatar4 from "../../assets/avatar-images/Avatar-4.svg";
import Avatar5 from "../../assets/avatar-images/Avatar-5.svg";
import Avatar6 from "../../assets/avatar-images/Avatar-6.svg";

const testimonials = [
  {
    paragraph:
      "I used to find trading cryptocurrencies quite daunting, but JetSupport has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend JetSupport to anyone looking to get started in crypto trading.",
    name: "Alex Johnson",
    rating: 5,
    avatar: Avatar2,
  },
  {
    paragraph:
      "I used to find trading cryptocurrencies quite daunting, but JetSupport has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend JetSupport to anyone looking to get started in crypto trading..",
    name: "Nathan Knorr",
    rating: 4,
    avatar: Avatar3,
  },
  {
    paragraph:
      "As a seasoned crypto trader, I have tried many different platforms over the years. However, JetSupport stands out as one of the best I have used. It offers a wide range of features and tools that have helped me maximize my profits. The security measures are also top-notch, which gives me peace of mind when trading.",
    name: "John Doe",
    rating: 3,
    avatar: Avatar4,
  },
  {
    paragraph:
      "I used to find trading cryptocurrencies quite daunting, but JetSupport has completely changed that for me. The app is straightforward and easy to navigate, which has made trading a seamless and enjoyable experience. I highly recommend JetSupport to anyone looking to get started in crypto trading.",
    name: "Jane Smith",
    rating: 5,
    avatar: Avatar5,
  },
  {
    paragraph:
      "As a seasoned crypto trader, I have tried many different platforms over the years. However, JetSupport stands out as one of the best I have used. It offers a wide range of features and tools that have helped me maximize my profits. The security measures are also top-notch, which gives me peace of mind when trading.",
    name: "Alex Johnson",
    rating: 4,
    avatar: Avatar6,
  },
  {
    paragraph:
      "I have been using JetSupport for over a year now and I can confidently say that it has revolutionized the way I trade cryptocurrencies. The app is user-friendly and provides detailed insights into my trading activities. The support team is also incredibly responsive and helpfu",
    name: "Chris Lee",
    rating: 4,
    avatar: Avatar2,
  },
];

const TestimonialSlider = () => {
  React.useEffect(() => {
    const keenSlider = new KeenSlider("#keen-slider", {
      loop: true,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 2.5,
            spacing: 32,
          },
        },
      },
    });

    const keenSliderPrevious = document.getElementById("keen-slider-previous");
    const keenSliderNext = document.getElementById("keen-slider-next");

    keenSliderPrevious.addEventListener("click", () => keenSlider.prev());
    keenSliderNext.addEventListener("click", () => keenSlider.next());

    return () => {
      keenSlider.destroy();
      keenSliderPrevious.removeEventListener("click", () => keenSlider.prev());
      keenSliderNext.removeEventListener("click", () => keenSlider.next());
    };
  }, []);

  return (
    <section className="">
      <div className=" py-12  lg:me-0 lg:py-16  xl:py-24">
        <div className="max-w-7xl items-end justify-end sm:flex sm:pe-6 lg:pe-8">
        
          <div className=" flex gap-4 lg:mt-0">
            <button
              aria-label="Previous slide"
              id="keen-slider-previous"
              className="rounded-full border border-primary p-3 text-primary transition hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              aria-label="Next slide"
              id="keen-slider-next"
              className="rounded-full border border-primary p-3 text-primary transition hover:bg-primary hover:text-white"
            >
              <svg
                className="size-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="-mx-6 lg:mt-8 lg:col-span-2 lg:mx-0">
          <div id="keen-slider" className="keen-slider">
            {testimonials.map((testimonial, index) => (
              <div className="keen-slider__slide" key={index}>
                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex my-4">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p className="mt-4 leading-relaxed text-gray-700">
                        {testimonial?.paragraph}
                      </p>
                    </div>
                  </div>

                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                    &mdash; {testimonial?.name}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider
