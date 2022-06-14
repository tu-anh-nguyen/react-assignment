import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
);

ErrorComponent.propTypes = {
  message: PropTypes.string,
};

export default ErrorComponent;
