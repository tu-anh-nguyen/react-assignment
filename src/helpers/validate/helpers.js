/* eslint-disable no-useless-escape */
import { isValidPhoneNumber } from "libphonenumber-js";

const emailRegex =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const validate = {
  string: (_message = "Not a string") => ({
    handleValidate: (_value) => (typeof _value !== "string" ? _message : ""),
    priority: 2,
  }),

  number: (_message = "Not a number") => ({
    handleValidate: (_value) => (typeof _value !== "number" ? _message : ""),
    priority: 2,
  }),
  min(_min, _message) {
    return {
      handleValidate: (_value) =>
        _min > _value ? _message || `Min is ${_min}` : "",
      priority: 3,
    };
  },
  max(_max, _message) {
    return {
      handleValidate: (_value) =>
        _max < _value ? _message || `Max is ${_max}` : "",
      priority: 3,
    };
  },
  moreThan(_number, _message) {
    return {
      handleValidate: (_value) =>
        _number >= _value ? _message || `Must greater than ${_number}` : "",
      priority: 3,
    };
  },
  email: (_message = "Invalid email") => ({
    handleValidate: (_value) => {
      const isValidEmail = emailRegex.test(_value);
      return !isValidEmail ? _message : "";
    },
    priority: 2,
  }),

  phone: (_message = "Invalid phone number") => ({
    handleValidate: (_value) => {
      const isValid = isValidPhoneNumber(_value);
      return !isValid ? _message : "";
    },
    priority: 2,
  }),
  date: (_message = "Invalid date") => ({
    handleValidate: (_value) => {
      const date = new Date(_value);
      const isValidDate = date instanceof Date && isFinite(date);
      return !isValidDate ? _message : "";
    },
    priority: 2,
  }),
  required: (_message = "Required") => ({
    handleValidate: (_value) => (!_value && _value !== 0 ? _message : ""),
    priority: 1,
  }),
};
export default validate;
