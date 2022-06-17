import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NoPage() {
  useEffect(() => {
    document.title = "404 Page not found";
  }, []);

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
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
          <button type="button" className="btn btn-outline-info">
            Back to homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
