import React, { Component } from "react";

export default class Input extends Component {
  render() {
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
    } = this.props;
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
  }
}
