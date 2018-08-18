import React from 'react';
import PropTypes from 'prop-types';

import './styles/Tile.css';
import { StatusOverlay } from "../components/StatusProvider";
import { DEFAULT, FAILURE } from "../constants/status";

const TilePage = ({ match, tiles }) => {
  const currentTile = tiles.find(tile => tile.id.toString() === match.params.id);
  const status = currentTile ? DEFAULT() : FAILURE('Tile wasn\'t found');

  return (
    <StatusOverlay status={status}>
      {() => (
        <article className="tile tile-article">
          <h1 className="tile-article-title">{currentTile.title}</h1>
          <h4 className="tile-article-description">{currentTile.description}</h4>
          <p className="tile-article-text">{currentTile.text}</p>
        </article>
      )}
    </StatusOverlay>
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
  })).isRequired
};

export default TilePage;
