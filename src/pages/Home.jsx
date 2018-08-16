import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Card, Loading } from '../components';

import './styles/Home.css';

const HomePage = ({ tiles, loading }) => loading ? <Loading /> : (
  <section className="home home-section">
    {tiles.map((tile, index) => <Card tile={tile} key={index} />)}
  </section>
);

HomePage.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['normal', 'double']),
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string
  })).isRequired,
  loading: PropTypes.bool.isRequired
};

export default HomePage;
