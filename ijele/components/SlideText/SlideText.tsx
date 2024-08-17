import React from 'react';

interface SlideTextProps {
  textOnLeft?: boolean;
  text: string;
}

const SlideText: React.FC<SlideTextProps> = ({ textOnLeft = true, text }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-[100px]">
      {textOnLeft ? (
        <h1 className="text-2xl font-bold animate-slideInBottom max-h-[100px] overflow-hidden flex items-center">
          {text}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold animate-slideInBottom max-h-[100px] overflow-hidden flex items-center">
          {text}
        </h1>
      )}
    </div>
  );
};

export default SlideText;
