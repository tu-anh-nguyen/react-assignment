import React from "react";
import PropTypes from "prop-types";

const Divider = ({ children }) => (
  <p className="text-uppercase text-primary fw-bold fs-5">{children}</p>
);

Divider.propTypes = {
  children: PropTypes.any,
};

export default Divider;
