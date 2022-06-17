import React, { useEffect } from "react";
import List from "../components/List";

export default function UserList() {
  useEffect(() => {
    document.title = "Management users";
  }, []);
  return <List />;
}
