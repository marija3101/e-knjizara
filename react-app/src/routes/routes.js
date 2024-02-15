import Dashboard from "../komponente/admin/Dashboard";
import Profile from "../komponente/admin/Profile";
import Author from "../komponente/admin/Author";
import ViewAuthor from "../komponente/admin/ViewAuthor";
import AddBook from "../komponente/admin/AddBook";
import ViewBook from "../komponente/admin/ViewBook";
import EditBook from "../komponente/admin/EditBook";
import EditAuthor from "../komponente/admin/EditAuthor";
import Genre from "../komponente/admin/Genre";
import ViewGenre from "../komponente/admin/ViewGenre";
import EditGenre from "../komponente/admin/EditGenre";
import Charts from "../komponente/Charts";
import Order from "../komponente/admin/Order";
import Coupon from "../komponente/admin/Coupon";
import ViewCoupon from "../komponente/admin/ViewCoupon";
const routes = [
  {
    path: "/admin",
    exact: true,
    name: "Admin",
  },

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
    path: "/admin/orders",
    exact: true,
    name: "Order",
    component: Order,
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
  {
    path: "/admin/add-book",
    exact: true,
    name: "AddBook",
    component: AddBook,
  },
  {
    path: "/admin/view-book",
    exact: true,
    name: "ViewBook",
    component: ViewBook,
  },
  {
    path: "/admin/edit-author/:id",
    exact: true,
    name: "EditAuthor",
    component: EditAuthor,
  },

  {
    path: "/admin/edit-book/:id",
    exact: true,
    name: "EditBook",
    component: EditBook,
  },
  {
    path: "/admin/edit-genre/:id",
    exact: true,
    name: "EditGenre",
    component: EditGenre,
  },
  {
    path: "/admin/genre",
    exact: true,
    name: "Genre",
    component: Genre,
  },
  {
    path: "/admin/view-genre",
    exact: true,
    name: "ViewGenre",
    component: ViewGenre,
  },
  {
    path: "/admin/charts",
    exact: true,
    name: "Charts",
    component: Charts,
  },
  {
    path: "/admin/coupons",
    exact: true,
    name: "Coupon",
    component: Coupon,
  },
  {
    path: "/admin/view-coupon",
    exact: true,
    name: "ViewCoupon",
    component: ViewCoupon,
  },
];

export default routes;
