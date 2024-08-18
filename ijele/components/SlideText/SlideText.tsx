import React from 'react';

interface SlideTextProps {
  textOnLeft?: boolean;
  text: string;
}

const SlideText: React.FC<SlideTextProps> = ({ textOnLeft = true, text }) => {
  const words = text.split(' ');

  return (
    <div className="flex justify-center items-center w-full min-h-[100px]">
      <h1 className="text-2xl font-junge text-ijele_teal font-bold flex items-center">
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden animate-slideInTop"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {word}&nbsp;
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SlideText;
