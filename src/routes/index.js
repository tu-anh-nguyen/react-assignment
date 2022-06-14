import { UserList, CreateAndUpdateUser, NotFound } from "../apps";

const routes = [
  { path: "/", element: <UserList />, exact: true },
  { path: "/create", element: <CreateAndUpdateUser />, exact: true },
  {
    path: "/update/:id",
    element: <CreateAndUpdateUser />,
    exact: true,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
