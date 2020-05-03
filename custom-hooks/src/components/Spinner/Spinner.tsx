import React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  isVisible?: boolean;
}

const markerStyle: React.CSSProperties = {
  marginTop: 20,
  height: 50,
  width: 50,
  borderRadius: '50%',
  border: '10px solid royalblue',
  clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ isVisible }, ref) => (
    <div
      className="spin"
      ref={ref}
      style={{
        ...markerStyle,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    />
  ),
);

Spinner.displayName = 'Spinner';
