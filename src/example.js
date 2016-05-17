import 'babel-polyfill';
import React from 'react';
import Carousel from './';

export default (
  <div style={{ 'max-width': 1308, margin: '0 auto' }}>
    <Carousel
      controlNodes={{
        next: '▶',
        previous: '◀',
      }}
      gutter={22.5}
      visibleItems={4}
    >
      <div className="example-node" key="0">
        <div className="example-node__image" />
        <h3 className="example-node__title">Work for us: Nico Colchester journalism fellowshiphs</h3>
        <h4 className="example-node__subtitle">Europe | 1 hour 44 mins ago</h4>
      </div>
      <div className="example-node" key="1">
        <div className="example-node__image" />
        <h3 className="example-node__title">The Economist explains: What happened in the Thirty Years Wat?</h3>
        <h4 className="example-node__subtitle">The Economist explains | 1 day ago</h4>
      </div>
      <div className="example-node" key="2">
        <div className="example-node__image" />
        <h3 className="example-node__title">
          Unions and the Supreme Court: The justice seems poised to deliver a blow to public-sector unions
        </h3>
        <h4 className="example-node__subtitle">The Economist explains | 2 days ago</h4>
      </div>
      <div className="example-node" key="3">
        <div className="example-node__image" />
        <h3 className="example-node__title">
          Catalonian independence: Catalonia's new president is even more secessionist than the last
        </h3>
        <h4 className="example-node__subtitle">Europe | 2 days ago</h4>
      </div>
      <div className="example-node" key="4">
        <div className="example-node__image" />
        <h3 className="example-node__title">Work for us: Nico Colchester journalism fellowshiphs</h3>
        <h4 className="example-node__subtitle">Europe | 1 hour 44 mins ago</h4>
      </div>
    </Carousel>
  </div>
);
