import React, { Component } from "react";
import List from "../components/List";

class UserList extends Component {
  componentDidMount() {
    document.title = "Management users";
  }

  render() {
    return <List />;
  }
}

export default UserList;
