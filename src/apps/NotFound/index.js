import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NoPage extends Component {
  componentDidMount() {
    document.title = "404 Page not found";
  }
  render() {
    return (
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>
              4<span></span>4
            </h1>
          </div>
          <h2>Oops! Page Not Be Found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable
          </p>
          <Link to="/">
            <button type="button" class="btn btn-outline-info">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
