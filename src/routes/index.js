import { UserList, CreateAndUpdateUser } from "../components/apps";

const routes = [
  { path: "/", element: UserList, exact: true },
  { path: "/create", element: CreateAndUpdateUser, exact: true },
  {
    path: "/update/:id",
    element: CreateAndUpdateUser,
    exact: true,
  },
];

export default routes;
