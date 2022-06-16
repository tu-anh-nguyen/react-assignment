import React, { Component } from "react";

const withValidate = ({
  mapPropsToValues,
  validate,
  onSubmit,
  validateOnChange = false,
}) => {
  return (WrappedComponent) =>
    class FormValidation extends Component {
      constructor(props) {
        super(props);
        this.validate = validate;
        this.onSumit = onSubmit;
        this.initialValues = mapPropsToValues(this.props);
        this.validateOnChange = validateOnChange;
        this.fields = Object.keys(this.initialValues);
        this.state = {
          isSubmitting: false,
          errors: {},
          errorsOnSubmit: {},
          values: this.initialValues,
          isValid: true,
        };
        this.mapStateToProps.bind(this);
        this.runValidate.bind(this);
      }

      onBlur(event) {
        const { touched } = this.state;
        let { name: field, value } = event.target;
        this.setState(!touched);
        this.runValidate(field, value);
      }

      setSubmitting(_value) {
        this.setState({ isSubmitting: _value });
      }

      handleChange(event) {
        let { name: field, value } = event.target;
        if (this.validateOnChange) {
          this.runValidate(field, value);
        } else this.setFieldValue(field, value);
      }
      setFieldError(_field, _value) {
        let { errors } = this.state;
        errors[_field] = _value;
        this.setState(errors);
      }
      setFieldValue(_field, _value) {
        let { values } = this.state;
        values[_field] = _value;
        this.setState(values);
      }
      handleSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        if (!this.validateOnChange) {
          this.fields.forEach((field) =>
            this.runValidate(field, this.state.values[field])
          );
        }
        var isInvalid = !this.checkIsValid();
        if (isInvalid) {
          return;
        }
        this.setState({ isSubmitting: false });
        this.onSumit(this.state.values);
      }
      checkIsValid() {
        return Object.values(this.state.errors).some((err) => err);
      }
      runValidate(field, value) {
        let { values, errors } = this.state;
        values[field] = value;
        const validates = this.validate[field] || [];
        const { error } = validates.reduce(
          (acc, validate = {}) => {
            const { handleValidate, priority } = validate;
            if (!acc.priority || !acc.error || acc.priority >= priority) {
              acc.error = handleValidate?.(value) || acc.error;
              acc.priority = priority;
            }
            return acc;
          },
          { error: "" }
        );
        errors[field] = error;
        this.setState({
          errors,
          values,
        });
      }

      mapStateToProps({ errors, values, isSubmitting }) {
        return {
          errors,
          values,
          isSubmitting,
          handleChange: this.handleChange.bind(this),
          handleSubmit: this.handleSubmit.bind(this),
          setFieldError: this.setFieldError.bind(this),
          setFieldValue: this.setFieldValue.bind(this),
        };
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.mapStateToProps(this.state)}
          />
        );
      }

      getFormData() {
        return this.state.values;
      }
    };
};

export default withValidate;
