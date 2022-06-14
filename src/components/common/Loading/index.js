import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-primary" role="status" />
        <span className="text-primary mx-2">Loading...</span>
      </div>
    );
  }
}
