import React from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <nav
      className="sb-sidenav accordion sb-sidenav-dark"
      id="sidenavAccordion"
    >
      <div className="sb-sidenav-menu">
        <div className="nav">
          <Link
            className="nav-link"
            to="/admin/dashboard"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>
          <Link
            className="nav-link"
            to="/admin/author"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Author
          </Link>
          <Link
            className="nav-link"
            to="/admin/view-author"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            View Author
          </Link>
          <Link
            className="nav-link"
            to="/admin/genre"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Genre
          </Link>
          <Link
            className="nav-link"
            to="/admin/view-genre"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            View Genre
          </Link>
          <Link
            className="nav-link collapsed"
            to="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseBooks"
            aria-expanded="false"
            aria-controls="collapseBooks"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns"></i>
            </div>
            Books
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseBooks"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link
                className="nav-link"
                to="/admin/add-book"
              >
                Add book
              </Link>
              <Link
                className="nav-link"
                to="/admin/view-book"
              >
                View book
              </Link>
            </nav>
          </div>
          <Link
            className="nav-link"
            to="/admin/profile"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Profile
          </Link>

          <Link
            className="nav-link"
            to="/admin/orders"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Orders
          </Link>

          <div
            className="collapse"
            id="collapsePages"
            aria-labelledby="headingTwo"
            data-bs-parent="#sidenavAccordion"
          >
            <nav
              className="sb-sidenav-menu-nested nav accordion"
              id="sidenavAccordionPages"
            ></nav>
          </div>
          <Link
            className="nav-link"
            to="/admin/charts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-chart-area"></i>
            </div>
            Charts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
