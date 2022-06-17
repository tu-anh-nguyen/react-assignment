import React from "react";
import PropTypes from "prop-types";

const Select = (props) => {
  const { label, required, error, id, option, value, name,disabled, onChange } = props;
  return (
    <div className="form-group mt-1">
      <label className="mb-1 fw-bold form-label" htmlFor={id}>
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        id={id}
        disabled={disabled}
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
};

Select.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string,
  option: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      name: PropTypes.string,
    })
  ),
  value: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
