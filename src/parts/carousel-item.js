import React from 'react';

export default function CarouselItem({ children, gutter, width }) {
  const style = {
    width: `${ width }px`,
    'paddingRight': `${ gutter / 2 }px`,
    'paddingLeft': `${ gutter / 2 }px`,
  };
  return (
    <li className="carousel__item" style={style}>
      {children}
    </li>
  );
}

if (process.env.NODE_ENV !== 'production') {
  CarouselItem.propTypes = {
    gutter: React.PropTypes.number,
    children: React.PropTypes.node,
    width: React.PropTypes.number,
  };
}
