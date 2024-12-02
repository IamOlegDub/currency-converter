import React from 'react';

const SkeletonRateBlock = () => (
    <div className="bg-white/30 text-white rounded-3xl p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] animate-pulse flex flex-col items-center">
        <div className="h-4 bg-gray-300/60 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300/60 rounded w-1/2"></div>
    </div>
);

export default SkeletonRateBlock;
