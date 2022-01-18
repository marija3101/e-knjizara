import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link
        className="navbar-brand ps-3"
        to="/admin"
      >
        Bookland
      </Link>
    </nav>
  );
};

export default NavBar;
