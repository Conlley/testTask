import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../components';

import './styles/Tile.css';

const TilePage = ({ match, tiles, loading }) => {
  const currentTile = tiles.find(tile => tile.id.toString() === match.params.id);

  return loading ? <Loading /> : (
    <article className="tile tile-article">
      <h1 className="tile-article-title">{currentTile.title}</h1>
      <h4 className="tile-article-description">{currentTile.description}</h4>
      <p className="tile-article-text">{currentTile.text}</p>
    </article>
  );
};

TilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  }).isRequired,
  tiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['normal', 'double']),
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string
  })).isRequired,
  loading: PropTypes.bool.isRequired
};

export default TilePage;
