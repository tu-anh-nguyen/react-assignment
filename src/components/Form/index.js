import moment from "moment";
import React, { Component } from "react";
import Input from "./Input";
import { withFormik } from "formik";
import * as yup from "yup";
import Select from "./Select";
import { isValidPhoneNumber } from "libphonenumber-js";
import Divider from "./Divider";

class Form extends Component {
  genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  render() {
    const {
      values,
      errors,
      status,
      submitCount,
      handleSubmit,
      setFieldError,
      setFieldValue,
      isSubmitting,
    } = this.props;
    console.log("this.props", this.props);
    const handleOnChangeInput = (event) => {
      const { name, value } = event.target;
      setFieldError(name, undefined);
      setFieldValue(name, value);
    };
    const isNewUser = !Boolean(values?.id);
    const isFirstSubmit = !submitCount; // submitCount default = 0
    return (
      <div className="container-sm" style={{ maxWidth: 800 }}>
        <h2 className="text-uppercase fw-bold text-center">
          {isNewUser ? "create a new user" : "update user"}
        </h2>
        <div
          className={`alert ${
            !isFirstSubmit && !isSubmitting
              ? status
                ? "alert-success"
                : "alert-danger"
              : "alert-info"
          }`}
          role="alert"
        >
          {!isFirstSubmit && !isSubmitting && (
            <>
              {status
                ? "The form was successfully submitted!"
                : "The form was failed submitted."}
              <br />
            </>
          )}
          Fill the form below to{" "}
          {isNewUser ? "create a new user" : "update user"}
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <Divider>Account Details</Divider>
          <div className="row">
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="username-input"
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleOnChangeInput}
                value={values.username}
                error={errors.username}
                label="Username"
              />
            </div>
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="password-input"
                type="text"
                name="password"
                placeholder="Password"
                required
                onChange={handleOnChangeInput}
                value={values.password}
                error={errors.password}
                label="Password"
              />
            </div>
          </div>
          <Divider>Personal Details</Divider>
          <div className="row">
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="firstName-input"
                type="text"
                name="firstName"
                placeholder="First name"
                required
                onChange={handleOnChangeInput}
                value={values.firstName}
                error={errors.firstName}
                label="First name"
              />
            </div>
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="lastName-input"
                type="text"
                placeholder="Last name"
                label="Last name"
                name="lastName"
                required
                onChange={handleOnChangeInput}
                value={values.lastName}
                error={errors.lastName}
              />
            </div>
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="maidenName-input"
                type="text"
                placeholder="Maiden name"
                label="Maiden name"
                name="maidenName"
                onChange={handleOnChangeInput}
                value={values.maidenName}
                error={errors.maidenName}
              />
            </div>
            <div className="col-12 col-sm-6">
              <Select
                label="Gender"
                required
                id="gender-selecte"
                option={this.genders}
                name="gender"
                onChange={handleOnChangeInput}
                value={values.gender}
                error={errors.gender}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-7 col-sm-9">
              <Input
                disabled={isSubmitting}
                id="birthDate-input"
                type="date"
                placeholder="Birth date"
                label="Birth date"
                onChange={(event) => {
                  const { name, value } = event.target;
                  const birthDate = new Date(value);
                  const age = Math.ceil(
                    moment(new Date()).diff(moment(birthDate), "years", true)
                  );
                  setFieldError(name, undefined);
                  setFieldValue(name, value);
                  setFieldValue("age", age);
                }}
                name="birthDate"
                required
                value={values.birthDate}
                error={errors.birthDate}
              />
            </div>
            <div className="col-5 col-sm-3">
              <Input
                disabled={isSubmitting}
                id="age-input"
                key={values.birthDate}
                type="number"
                placeholder="Age"
                label="Age"
                name="age"
                required
                onChange={handleOnChangeInput}
                value={values.age}
                error={errors.age}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="email-input"
                placeholder="email@example.com"
                label="Email"
                onChange={handleOnChangeInput}
                name="email"
                required
                value={values.email}
                error={errors.email}
              />
            </div>
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="phone-input"
                placeholder="+84 123 456 789"
                label="Phone Number"
                name="phone"
                required
                onChange={handleOnChangeInput}
                value={values.phone}
                error={errors.phone}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 ">
              <Input
                disabled={isSubmitting}
                id="address-input"
                placeholder="Address Line"
                label="Address Line"
                name="address"
                onChange={handleOnChangeInput}
                value={values.address}
                error={errors.address}
              />
            </div>
            <div className="col-12 col-sm-6">
              <Input
                disabled={isSubmitting}
                id="city-input"
                placeholder="City"
                label="City"
                name="city"
                onChange={handleOnChangeInput}
                value={values.city}
                error={errors.city}
              />
            </div>
            <div className="col-6 col-sm-3">
              <Input
                disabled={isSubmitting}
                id="state-input"
                placeholder="State"
                label="State"
                name="state"
                onChange={handleOnChangeInput}
                value={values.state}
                error={errors.state}
              />
            </div>
            <div className="col-6 col-sm-3">
              <Input
                disabled={isSubmitting}
                id="postalCode-input"
                placeholder="Post code"
                label="Post code"
                name="postalCode"
                onChange={handleOnChangeInput}
                value={values.postalCode}
                error={errors.postalCode}
              />
            </div>
          </div>
          <div class="d-grid gap-2 col-10 mx-auto">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary my-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const formikForm = withFormik({
  mapPropsToValues(props) {
    console.log("props", props);
    const { initialValues } = props;
    return {
      id: initialValues.id || "",
      username: initialValues.username || "",
      password: initialValues.password || "",
      firstName: initialValues.firstName || "",
      lastName: initialValues.lastName || "",
      maidenName: initialValues.maidenName || "",
      gender: initialValues.gender || "",
      email: initialValues.email || "",
      phone: initialValues.phone || "",
      birthDate: initialValues.birthDate || "",
      address: initialValues.address?.address || "",
      city: initialValues.address?.city || "",
      postalCode: initialValues.address?.postalCode || "",
      state: initialValues.address?.state || "",
      age: initialValues.age || 0,
    };
  },
  validationSchema: yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    maidenName: yup.string(),
    gender: yup.string().required("Gender is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .test("isValidPhoneNumber", "Invalid phone number", function (value) {
        if (!value) return true;
        const isValid = isValidPhoneNumber(value, this.parent.countryCode);
        return isValid;
      }),
    birthDate: yup
      .date()
      .required("Birth date is required")
      .max(new Date(), "Birthday is invalid"),
    address: yup.string(),
    city: yup.string(),
    postalCode: yup.string(),
    state: yup.string(),
    age: yup.number().moreThan(0, "Must be greater than 0"),
  }),
  validateOnChange: false,
  handleSubmit: (values, props) => {
    console.log("props", props);
    const { setSubmitting, resetForm, setStatus } = props;
    setTimeout(() => {
      setStatus(true);
      setSubmitting(false);
    }, 1222);
  },
})(Form);

export default formikForm;
