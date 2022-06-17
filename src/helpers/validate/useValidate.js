import { useState } from "react";

export default function useValidate({
  initialValues,
  validateOnChange,
  handleValidation,
  onSubmit,
}) {
  const fields = Object.keys(initialValues);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isValid, setValid] = useState(true);
  const [touched, setTouched] = useState({});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setFieldValue = (_field, _value) => {
    setValues((pre) => ({ ...pre, [_field]: _value }));
  };

  const setFieldError = (_field, _value) => {
    setErrors((pre) => ({ ...pre, [_field]: _value }));
  };

  const setFieldTouched = (_field, _value) => {
    setTouched((pre) => ({ ...pre, [_field]: _value }));
  };

  const runValidate = (_field, _value) => {
    const validates = handleValidation[_field] || [];
    const { error } = validates.reduce((acc, validate = {}) => {
      const { handleValidate, priority } = validate;
      if (!acc.priority || !acc.error || acc.priority >= priority) {
        acc.error = handleValidate?.(_value) || acc.error;
        acc.priority = priority;
      }
      return acc;
    }, {});
    setFieldValue(_field, _value);
    setFieldError(_field, error);
    return !Boolean(error); // return true if valid.
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldTouched(name, true);
    if (validateOnChange) {
      runValidate(name, value);
    } else setFieldValue(name, value);
  };
  const resetForm = () => {
    setErrors({});
    setValues(initialValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.preventDefault();
    setSubmitting(true);
    let isInvalid;
    let isFormHasChanged = Object.values(touched).some((touch) => touch);
    if (!validateOnChange || !isFormHasChanged) {
      isInvalid = fields
        .map((field) => runValidate(field, values[field]))
        .some((valid) => !valid);
    } else {
      console.log("errors", errors);
      isInvalid = Object.values(errors).some((err) => err);
    }
    setValid(!isInvalid);
    if (!isInvalid) {
      await onSubmit(values);
    }
    setSubmitting(false);
  };

  return {
    handleChange,
    handleSubmit,
    setValid,
    setFieldError,
    setFieldValue,
    setSubmitting,
    values,
    errors,
    isSubmitting,
    isValid,
    resetForm,
  };
}
