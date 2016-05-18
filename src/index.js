import CarouselList from './parts/carousel-list';
import CarouselItem from './parts/carousel-item';
import CarouselControl from './parts/carousel-control';
import React from 'react';

export default class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.handlePreviousClick = this.handleControlClick.bind(this, 'previous');
    this.handleNextClick = this.handleControlClick.bind(this, 'next');
    this.state = {
      listElementDimension: 0,
      listDimension: 0,
    };
  }

  componentDidMount() {
    // ftscroller must be required only on the client, as it accesses window.document on require
    const Scroller = require('ftscroller').FTScroller; // eslint-disable-line global-require
    const { scroller: scrollerElement } = this.refs;
    const { children, gutter, scrollerOptions, vertical, visibleItems } = this.props;
    const listElementDimension = this.props.vertical ?
      (scrollerElement.offsetHeight + gutter) / visibleItems :
      (scrollerElement.offsetWidth + gutter) / visibleItems;
    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      listElementDimension,
      listDimension: listElementDimension * children.length,
    }, () => {
      this.scroller = new Scroller(
        scrollerElement,
        Object.assign({}, scrollerOptions, { scrollingY: vertical, scrollingX: !vertical })
      );
    });
  }

  handleControlClick(direction, event) {
    event.stopPropagation();
    const { listElementDimension } = this.state;
    const scrollSpan = direction === 'previous' ? -listElementDimension : listElementDimension;
    if (this.props.vertical) {
      this.scroller.scrollBy(0, scrollSpan, true);
    } else {
      this.scroller.scrollBy(scrollSpan, 0, true);
    }
    event.preventDefault();
  }

  render() {
    const { children, gutter, nextButton, previousButton, vertical } = this.props;
    const carouselItems = children.map(
      (child, index) =>
        <CarouselItem
          key={index}
          dimension={this.state.listElementDimension}
          gutter={gutter}
          vertical={vertical}
        >
          {child}
        </CarouselItem>
    );
    return (
      <div className="carousel">
        {
          previousButton &&
          <CarouselControl
            direction="previous"
            onClick={this.handlePreviousClick}
          >
            {previousButton}
          </CarouselControl>
        }
        <div className="carousel__wrapper" ref="scroller">
          <CarouselList
            dimension={this.state.listDimension}
            gutter={gutter}
            vertical={vertical}
          >
            {carouselItems}
          </CarouselList>
        </div>
        {
          nextButton &&
          <CarouselControl
            direction="next"
            onClick={this.handleNextClick}
          >
            {nextButton}
          </CarouselControl>
        }
      </div>
    );
  }
}

Carousel.defaultProps = {
  scrollerOptions: {
    scrollbars: false,
    updateOnWindowResize: true,
  },
  visibleItems: 4,
};

if (process.env.NODE_ENV !== 'production') {
  Carousel.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.node),
    nextButton: React.PropTypes.node,
    previousButton: React.PropTypes.node,
    gutter: React.PropTypes.number,
    scrollerOptions: React.PropTypes.shape({
      alwaysScroll: React.PropTypes.bool,
      baseAlignments: React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number,
      }),
      bouncing: React.PropTypes.bool,
      contentWidth: React.PropTypes.number,
      contentHeight: React.PropTypes.number,
      disabledInputMethods: React.PropTypes.shape({
        mouse: React.PropTypes.bool,
        touch: React.PropTypes.bool,
        scroll: React.PropTypes.bool,
        pointer: React.PropTypes.bool,
        focus: React.PropTypes.bool,
      }),
      enableRequestAnimationFrameSupport: React.PropTypes.bool,
      flinging: React.PropTypes.bool,
      hwAccelerationClass: React.PropTypes.string,
      maxFlingDuration: React.PropTypes.number,
      scrollbars: React.PropTypes.bool,
      scrollBoundary: React.PropTypes.number,
      scrollingClassName: React.PropTypes.string,
      scrollResponseBoundary: React.PropTypes.number,
      scrollingX: React.PropTypes.bool,
      scrollingY: React.PropTypes.bool,
      singlePageScrolls: React.PropTypes.bool,
      snapping: React.PropTypes.bool,
      snapSizeX: React.PropTypes.number,
      snapSizeY: React.PropTypes.number,
      updateOnChanges: React.PropTypes.bool,
      updateOnWindowResize: React.PropTypes.bool,
      windowScrollingActiveFlag: React.PropTypes.string,
      flingBezier: React.PropTypes.string,
      bounceDecelerationBezier: React.PropTypes.string,
      bounceBezier: React.PropTypes.string,
      invertScrollWheel: React.PropTypes.bool,
    }),
    vertical: React.PropTypes.bool,
    visibleItems: React.PropTypes.number,
  };
}
