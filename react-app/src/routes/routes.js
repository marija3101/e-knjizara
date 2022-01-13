import Dashboard from "../komponente/admin/Dashboard";
import Profile from "../komponente/admin/Profile";
import Author from "../komponente/admin/Author";
import ViewAuthor from "../komponente/admin/ViewAuthor";

const routes = [
  /*{
    path: "/admin",
    exact: true,
    name: "Admin",
  },*/
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/admin/author",
    exact: true,
    name: "Author",
    component: Author,
  },
  {
    path: "/admin/view-author",
    exact: true,
    name: "ViewAuthor",
    component: ViewAuthor,
  },
];

export default routes;
