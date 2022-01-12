import React from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
import swal from "sweetalert";

const NavBar = ({ cartNum, token }) => {
  /*function handleLogout(e) {
    e.preventDefault();
    var config = {
      method: "post",
      url: "logout",
      headers: {
        Authorization:
          "Bearer " +
          window.sessionStorage.getItem(
            "auth_token"
          ),
      },
    };

    axios(config).then((res) => {
      console.log(res.data);
      window.sessionStorage.setItem(
        "auth_token",
        null
      );
    });
  }*/
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
          /*onClick={
          handleLogout
        }*/
        >
          Logout
        </button>
      </li>
    );
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light lg-primary shadow stick-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="#"
          >
            Navbar
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
                  Books App
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/books"
                >
                  All Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <p className="nav-li">
                  {cartNum}
                </p>
              </li>
              {AuthButtons}
            </ul>
          </div>
        </div>
      </nav>
      {/*<Outlet />*/}
    </div>
  );
};

export default NavBar;
