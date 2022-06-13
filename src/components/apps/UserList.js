import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
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
