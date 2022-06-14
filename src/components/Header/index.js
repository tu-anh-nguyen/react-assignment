import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import withRouter from "../../helpers/withRouter";

class Header extends Component {
  render() {
    return (
      <div className="container-xl sticky-top mb-2">
        <nav className="navbar navbar-expand bg-secondary w-100">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link px-3" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link px-3" to="/create">
                    Create new user
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
