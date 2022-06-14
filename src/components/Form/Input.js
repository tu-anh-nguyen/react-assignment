import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const {
    id,
    name,
    value,
    type,
    placeholder,
    onChange,
    error,
    label,
    required,
    disabled,
  } = props;
  return (
    <div className="form-group mt-1">
      <label className="mb-1 fw-bold form-label" htmlFor={id}>
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {error ? (
        <small className="invalid-feedback">{error}</small>
      ) : (
        <div style={{ height: 25 }} />
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
