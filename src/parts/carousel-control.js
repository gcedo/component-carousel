import React from 'react';

export default function CarouselControl({ children, direction, onClick }) {
  return (
    <a className={`carousel__control carousel__control--${ direction }`} role="button" onClick={onClick}>
      {children}
    </a>
  );
}

if (process.env.NODE_ENV !== 'production') {
  CarouselControl.propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func.isRequired,
    direction: React.PropTypes.oneOf([ 'previous', 'next' ]),
  };
}
