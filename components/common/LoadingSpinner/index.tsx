'use client'

import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader className="animate-spin text-gray-500 w-8 h-8" />
    </div>
  );
};

export default LoadingSpinner;
