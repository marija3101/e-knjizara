import React from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {BiBookHeart} from 'react-icons/bi'

const NavBar = () => {

  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/logout")
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem(
            "auth_token"
          );
          localStorage.removeItem(
            "auth_name"
          );
          swal(
            "Success",
            res.data.message,
            "success"
          );
          history.push("/");
        }
      });
  };
  var AuthButtons = "";
  if (
    !localStorage.getItem("auth_token")
  ) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/register"
          >
            Register
          </Link>
        </li>{" "}
      </ul>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button
          type="button"
          className="nav-link btn btn-danger btn-sm"
          onClick={logoutSubmit}
        >
          Logout
        </button>
      </li>
    );
  }
  return (
    <div className="n">
    <div className="navv">
      <nav className="navbar navbar-expand-lg navbar-light lg-primary shadow stick-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="#"
          >
            Bookland
            <BiBookHeart />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarDark"
            aria-controls="navbarDark"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse show"
            id="navbarDark"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-xl-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/collections"
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
              {AuthButtons}
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </div>
  );
};

export default NavBar;
