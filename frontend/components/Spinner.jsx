import React from 'react';

export default ({
  width,
  height,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
  >
    {Array(12).fill(0).map((_, i) => (
      <rect
        style={{
          width: 1,
          height: 5,
        }}
        x={9}
        y={0}
        transform={`rotate(${i * 30} 10 10)`}
      >
        <animate
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          repeatCount="indefinite"
          attributeName="opacity"
          begin={`${-1 + (i / 12)}`}
        />
      </rect>
    ))}
  </svg>
);