import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Solinum
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Accueil
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Ajouter" className="nav-link">
            Ajouter
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/maps" className="nav-link">
            carte Maps
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
