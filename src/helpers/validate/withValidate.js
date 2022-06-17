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
          touched: {},
          values: this.initialValues,
          isValid: true,
        };
        this.mapStateToProps.bind(this);
        this.runValidate.bind(this);
        this.handleSubmit.bind(this);
      }

      setSubmitting(_value) {
        this.setState({ isSubmitting: _value });
      }

      handleChange(event) {
        let { name: field, value } = event.target;
        this.setFieldTouch(field, true);
        if (this.validateOnChange) {
          this.runValidate(field, value);
        } else this.setFieldValue(field, value);
      }

      setFieldTouch(_field, _value) {
        let { touched } = this.state;
        touched[_field] = _value;
        this.setState({ touched });
      }

      setFieldError(_field, _value) {
        const { errors } = this.state;
        errors[_field] = _value;
        this.setState({ errors });
      }

      setFieldValue(_field, _value) {
        let { values } = this.state;
        values[_field] = _value;
        this.setState({ values });
      }

      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        var isFormHasChanged = this.checkFormHasChanged();
        if (!this.validateOnChange || !isFormHasChanged) {
          this.fields.forEach((field) =>
            this.runValidate(field, this.state.values[field])
          );
        }
        var isInvalid = this.checkIsInvalid();
        if (!isInvalid) {
          await this.onSumit(this.state.values, this.props);
        }
        this.setState({ isSubmitting: false });
      }

      checkIsInvalid() {
        return Object.values(this.state.errors).some((err) => err);
      }

      checkFormHasChanged() {
        return Object.values(this.state.touched).some((touch) => touch);
      }
      resetForm() {
        this.setState({
          values: this.initialValues,
          errors: {},
        });
      }
      runValidate(_field, _value) {
        const { values, errors } = this.state;
        const validates = this.validate[_field] || [];
        const { error } = validates.reduce(
          (acc, validate = {}) => {
            const { handleValidate, priority } = validate;
            if (!acc.priority || !acc.error || acc.priority >= priority) {
              acc.error = handleValidate?.(_value) || acc.error;
              acc.priority = priority;
            }
            return acc;
          },
          { error: "" }
        );
        errors[_field] = error;
        values[_field] = _value;
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
          resetForm: this.resetForm.bind(this),
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
