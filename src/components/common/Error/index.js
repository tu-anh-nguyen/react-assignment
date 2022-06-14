import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <div className="alert alert-danger" role="alert">
        {this.props.message}
      </div>
    );
  }
}
