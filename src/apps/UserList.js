import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import List from "../components/List";

export default function UserList() {
  const statae = useSelector((state) => state);
  console.log("statae", statae);
  useEffect(() => {
    document.title = "Management users";
  }, []);
  return <List />;
}
