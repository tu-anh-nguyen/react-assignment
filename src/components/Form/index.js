import moment from "moment";
import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Divider from "./Divider";
import poster from "../../services/poster";
import putter from "../../services/putter";
import { withValidate, withRouter, validateHelper } from "../../helpers";
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
    const handleOnChangeInput = (event) => {
      const { name, value } = event.target;
      setFieldError(name, undefined);
      setFieldValue(name, value);
    };
    const isNewUser = !Boolean(values?.id);
    const isFirstSubmit = !submitCount; // submitCount default = 0
    return (
      <div className="container-sm" style={{ maxWidth: 800 }}>
        <h2 className="text-uppercase fw-bold text-center py-4">
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
          <div className="d-grid gap-2 col-10 mx-auto">
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
const formikForm = withValidate({
  mapPropsToValues(props) {
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

  validate: {
    username: [
      validateHelper.string(),
      validateHelper.required("Username is required"),
    ],
    password: [
      validateHelper.string(),
      validateHelper.required("Password is required"),
    ],
    firstName: [
      validateHelper.string(),
      validateHelper.required("Firstname is required"),
    ],
    lastName: [
      validateHelper.string(),
      validateHelper.required("Lastname is required"),
    ],
    maidenName: [validateHelper.string()],
    gender: [
      validateHelper.string(),
      validateHelper.required("Gender is required"),
    ],
    email: [
      validateHelper.string(),
      validateHelper.email(),
      validateHelper.required("Email is required"),
    ],
    phone: [
      validateHelper.string(),
      validateHelper.phone(),
      validateHelper.required("Phone number is required"),
    ],
    birthDate: [
      validateHelper.date(),
      validateHelper.required("Birth date is required"),
    ],
    address: [validateHelper.string()],
    city: [validateHelper.string()],
    postalCode: [validateHelper.string()],
    state: [validateHelper.string()],
    age: [
      validateHelper.number(),
      validateHelper.greaterThan(0, "Must be greater than 0"),
      validateHelper.required("Age is required"),
    ],
  },
  validateOnChange: false,
  onSubmit: async (values, props = {}) => {
    // const {
    //   setSubmitting,
    //   resetForm,
    //   setStatus,
    //   props: { match } = {}, // match is props of withRouter, we use this to go back previous page.
    // } = props;
    const id = values.id;
    const body = {
      ...(id && { id }),
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      maidenName: values.maidenName,
      gender: values.gender,
      email: values.email,
      phone: values.phone,
      birthDate: moment(values.birthDate).format("yyyy-mm-dd"),
      address: {
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        state: values.state,
      },
      age: values.age,
    };
    try {
      let resp;
      if (!id) {
        const { data } = await poster("/users/add", body);
        resp = data;
      } else {
        const { data } = await putter(`users/${id}`, body);
        resp = data;
      }
      if (!resp?.id) {
        return;
      }
      // setStatus(true);
      // match.navigate(-1);
      // resetForm();
    } catch (error) {
      throw Error(error);
    }
    // setSubmitting(false);
  },
})(Form);

export default withRouter(formikForm);
