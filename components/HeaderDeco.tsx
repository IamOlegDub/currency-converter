import React from 'react';

const HeaderDeco = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 800 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="150"
                    cy="150"
                    r="200"
                    fill="rgba(255, 255, 255, 0.1)"
                />
                <circle
                    cx="650"
                    cy="50"
                    r="150"
                    fill="rgba(255, 255, 255, 0.1)"
                />
            </svg>
        </div>
    );
};

export default HeaderDeco;
