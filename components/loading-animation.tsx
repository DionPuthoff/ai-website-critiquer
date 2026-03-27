'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/animations/website-building.json';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-44 md:h-64 md:w-80">
        <Lottie animationData={animationData} loop />
      </div>

      <p >
        Analyzing website...
      </p>
    </div>
  );
}