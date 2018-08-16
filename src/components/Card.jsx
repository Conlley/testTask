import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles/Card.css';

const PICTURE_SIZES = {
  normal: {
    width: 600,
    height: 300
  },
  double: {
    width: 1200,
    height: 600
  }
};

const Card = ({ tile }) => {
  const pictureSize = PICTURE_SIZES[tile.type];

  return (
    <div className={`card card-type-${tile.type}`}>
      <Link className="card-link" to={`/tile/${tile.id}`}>
        <h1 className="card-header">{tile.title}</h1>
        <h5 className="card-description">{tile.description}</h5>
      </Link>
      <img className="card-picture" src={`http://placekitten.com/${pictureSize.width}/${pictureSize.height}`} alt={tile.title}/>
    </div>
  )
};

Card.propTypes = {
  tile: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.oneOf(['normal', 'double']),
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
};

export default Card;
