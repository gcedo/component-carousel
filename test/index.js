import 'babel-polyfill';
import Carousel from '../src';
import { horizontalNodes } from '../src/example';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('Carousel', () => {

  it('renders a React element', () => {
    React.isValidElement(<Carousel />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let carousel = null;
    beforeEach(() => {
      rendered = mount(
        <Carousel
          nextButton={<span>▶</span>}
          previousButton={<span>◀</span>}
          gutter={22.5}
          visibleItems={4}
        >
          {horizontalNodes}
        </Carousel>
      );
      carousel = rendered.find('.carousel');
    });

    it('renders a top level div.carousel', () => {
      carousel.should.have.tagName('div');
      carousel.should.have.className('carousel');
    });

    xit('renders <FILL THIS IN>', () => {
      carousel.should.have.exactly(1).descendants('.the-descendent-class');
      carousel.find('.the-descendent-class').should.have.tagName('TAG');
    });

  });

});
