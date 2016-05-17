import CarouselList from './parts/carousel-list';
import CarouselItem from './parts/carousel-item';
import CarouselControl from './parts/carousel-control';
import React from 'react';
import Scroller from 'ftscroller';

export default class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.handlePreviousClick = this.handleControlClick.bind(this, 'previous');
    this.handleNextClick = this.handleControlClick.bind(this, 'next');
    this.state = {
      listElementWidth: 0,
      listWidth: 0,
    };
  }

  componentDidMount() {
    const { scroller: scrollerElement } = this.refs;
    const { children, gutter, scrollerOptions, visibleItems } = this.props;
    const listElementWidth = (scrollerElement.offsetWidth + gutter) / visibleItems;
    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      listElementWidth,
      listWidth: listElementWidth * children.length,
    }, () => {
      this.scroller = new Scroller(scrollerElement, scrollerOptions);
    });
  }

  handleControlClick(role, event) {
    event.stopPropagation();
    const horizontalScroll = role === 'previous' ? -this.state.listElementWidth : this.state.listElementWidth;
    this.scroller.scrollBy(horizontalScroll, 0, true);
    event.preventDefault();
  }

  render() {
    const { children, controlNodes, gutter, showControls } = this.props;
    const carouselItems = children.map(
      (child, index) =>
        <CarouselItem
          key={index}
          width={this.state.listElementWidth}
          gutter={gutter}
        >
          {child}
        </CarouselItem>
    );
    const controlPrevious = (
      <CarouselControl
        direction="previous"
        onClick={this.handlePreviousClick}
      >
        {controlNodes.previous}
      </CarouselControl>
   );
    const controlNext = (
      <CarouselControl
        direction="next"
        onClick={this.handleNextClick}
      >
        {controlNodes.next}
      </CarouselControl>
     );
    return (
      <div className="carousel">
        {showControls && controlPrevious}
        <div className="carousel__wrapper" ref="scroller">
          <CarouselList gutter={gutter} width={this.state.listWidth}>
            {carouselItems}
          </CarouselList>
        </div>
        {showControls && controlNext}
      </div>
    );
  }
}

Carousel.defaultProps = {
  scrollerOptions: {
    scrollbars: false,
    scrollingY: false,
    updateOnWindowResize: true,
  },
  showControls: true,
  visibleItems: 4,
};

if (process.env.NODE_ENV !== 'production') {
  Carousel.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.node),
    controlNodes: React.PropTypes.shape({
      next: React.PropTypes.node,
      previous: React.PropTypes.node,
    }),
    gutter: React.PropTypes.number,
    scrollerOptions: React.PropTypes.shape({
      // Full list of available options https://www.npmjs.com/package/ftscroller
      scrollbars: React.PropTypes.bool,
    }),
    showControls: React.PropTypes.bool,
    visibleItems: React.PropTypes.number,
  };
}
