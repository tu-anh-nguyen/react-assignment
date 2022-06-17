import { UserList, CreateAndUpdateUser, NotFound } from "../apps";

const routes = [
  { path: "/", element: <UserList />, exact: true },
  {
    path: "/create",
    element: <CreateAndUpdateUser key="create" />,
    exact: true,
  },
  {
    path: "/update/:id",
    element: <CreateAndUpdateUser key="edit" />,
    exact: true,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
