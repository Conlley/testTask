import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Header.css';

const Header = () => (
  <header className="header">
    <Link className="header-link" to="/home">Home</Link>
    <Link className="header-link" to="/about">About</Link>
    <Link className="header-link" to="/whatever">Whatever</Link>
  </header>
);

export default Header;
