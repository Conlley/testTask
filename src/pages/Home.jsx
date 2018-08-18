import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Card, StatusOverlay } from '../components';

import './styles/Home.css';

const HomePage = ({ tiles }) => (
  <StatusOverlay>
    {() => (
      <section className="home home-section">
        {tiles.map((tile, index) => <Card tile={tile} key={index} />)}
      </section>
    )}
  </StatusOverlay>
);

HomePage.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['normal', 'double']),
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string
  })).isRequired
};

export default HomePage;
