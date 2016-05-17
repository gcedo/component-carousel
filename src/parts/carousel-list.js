import React from 'react';

export default function CarouselList({ children, gutter, width }) {
  const style = {
    width: `${ width }px`,
    marginLeft: `${ -gutter / 2 }px`,
    marginRight: `${ -gutter / 2 }px`,
  };
  return (
    <ul className="carousel__list" style={style}>
      {children}
    </ul>
  );
}

if (process.env.NODE_ENV !== 'production') {
  CarouselList.propTypes = {
    gutter: React.PropTypes.number,
    children: React.PropTypes.node,
    width: React.PropTypes.number,
  };
}
