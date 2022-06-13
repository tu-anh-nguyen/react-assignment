import React, { Component } from "react";

export default class Divider extends Component {
  render() {
    const { children } = this.props;
    return (
      <p className="text-uppercase text-primary fw-bold fs-5">{children}</p>
    );
  }
}
