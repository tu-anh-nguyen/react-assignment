import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import List from "../List";

class UserList extends Component {
  componentDidMount() {
    document.title = "Management users";
  }

  render() {
    return <List />;
  }
}

export default withRouter(UserList);
