"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

interface SlideImageImageProps {
  imageOnLeft?: boolean;
  leftImageUrl: string;
  rightImageUrl: string;
  leftButtonText: string;
  rightButtonText: string;
  leftPage: string;
  rightPage: string;
}

const SlideImageImage: React.FC<SlideImageImageProps> = ({
  imageOnLeft = true,
  leftImageUrl,
  rightImageUrl,
  leftButtonText,
  rightButtonText,
  leftPage,
  rightPage
}) => {
  return (
    <div className="flex h-screen">
      {imageOnLeft ? (
        <>
          <div className="w-1/2 relative overflow-hidden animate-slideInLeft">
            <Image
              src={leftImageUrl}
              alt="Left Sliding Image"
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }} // Optional, depending on your styling needs
              priority
            />
            <Link href={leftPage} passHref>
              <button
                className="absolute bg-ijele_navy text-white font-bold py-2 px-4 rounded-lg hover:bg-ijele_deepGold transition-colors duration-300"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                {leftButtonText}
              </button>
            </Link>
          </div>
          <div className="w-1/2 relative overflow-hidden animate-slideInRight">
            <Image
              src={rightImageUrl}
              alt="Right Sliding Image"
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }} // Optional, depending on your styling needs
            />
            <Link href={rightPage} passHref>
              <button
                className="absolute bg-ijele_navy text-white font-bold py-2 px-4 rounded-lg hover:bg-ijele_deepGold transition-colors duration-300"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                {rightButtonText}
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2 relative overflow-hidden animate-slideInLeft">
            <Image
              src={rightImageUrl}
              alt="Right Sliding Image"
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }} // Optional, depending on your styling needs
            />
            <Link href={rightPage} passHref>
              <button
                className="absolute bg-ijele_navy text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                {rightButtonText}
              </button>
            </Link>
          </div>
          <div className="w-1/2 relative overflow-hidden animate-slideInRight">
            <Image
              src={leftImageUrl}
              alt="Left Sliding Image"
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }} // Optional, depending on your styling needs
            />
            <Link href={leftPage} passHref>
              <button
                className="absolute bg-ijele_navy text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                {leftButtonText}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SlideImageImage;
