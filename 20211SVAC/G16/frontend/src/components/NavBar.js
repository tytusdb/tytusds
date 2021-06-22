import React from 'react';
import { Link } from 'react-router-dom';

import './styles/NavBar.css';

class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <div className="container-fluid">
        <Link className="Navbar_text" to="/tytusds/20211SVAC/G16/frontend/build/">
            <span className="font-weight-light">TytusDS</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;