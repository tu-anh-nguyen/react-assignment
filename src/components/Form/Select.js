import React, { Component } from "react";

export default class Select extends Component {
  render() {
    const {
      label,
      required,
      error,
      id,
      option,
      disabled,
      value,
      name,
      onChange,
    } = this.props;
    return (
      <div className="form-group mt-1">
        <label className="mb-1 fw-bold form-label" htmlFor={id}>
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
        <select
          disabled={disabled}
          className={`form-select ${error ? "is-invalid" : ""}`}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
        >
          <option disabled value="">
            Choose...
          </option>
          {option.map(({ value, label }, idx) => (
            <option value={value} key={`${value}_${id}`}>
              {label}
            </option>
          ))}
        </select>
        {error ? (
          <small className="invalid-feedback">{error}</small>
        ) : (
          <div style={{ height: 25 }} />
        )}
      </div>
    );
  }
}
