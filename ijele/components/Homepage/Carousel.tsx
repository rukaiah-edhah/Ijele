import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Carousel: React.FC = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <a href="/page1">
            <Image
              src="/Images/tahj.jpg"  // Use the internal path to your image
              alt="Slide 1"
              layout="responsive"       // Use layout as needed (responsive, fixed, fill, intrinsic)
              width={800}               // Provide the width of the image
              height={400}              // Provide the height of the image
              className="w-full"
            />
          </a>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
      <a href="/page1">
            <Image
              src="/Images/turkey.jpg"  // Use the internal path to your image
              alt="Slide 1"
              layout="responsive"       // Use layout as needed (responsive, fixed, fill, intrinsic)
              width={800}               // Provide the width of the image
              height={400}              // Provide the height of the image
              className="w-full"
            />
          </a>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
      <a href="/page1">
            <Image
              src="/Images/japan.jpg"  // Use the internal path to your image
              alt="Slide 1"
              layout="responsive"       // Use layout as needed (responsive, fixed, fill, intrinsic)
              width={800}               // Provide the width of the image
              height={400}              // Provide the height of the image
              className="w-full"
            />
          </a>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
          className="w-full"
          alt="Slide 4"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
