import Home from "../komponente/frontend/Home";
import About from "../komponente/frontend/About";
import ViewAuthor from "../layouts/frontend/collections/ViewAuthor";
import Login from "../komponente/frontend/auth/Login";
import Register from "../komponente/frontend/auth/Register";
import ViewBook from "../layouts/frontend/collections/ViewBook";
import BookDetail from "../layouts/frontend/collections/BookDetail";
import Cart from "../komponente/frontend/Cart";
import Page403 from "../komponente/error/Page403";
import Page404 from "../komponente/error/Page404";
import Checkout from "../komponente/frontend/Checkout";
import Thankyou from "../komponente/frontend/Thankyou";
import Loyalty from "../komponente/frontend/Loyalty";

const Publicroutelist = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    exact: true,
    name: "About",
    component: About,
  },
  {
    path: "/403",
    exact: true,
    name: "Page403",
    component: Page403,
  },
  {
    path: "/404",
    exact: true,
    name: "Page404",
    component: Page404,
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    exact: true,
    name: "Register",
    component: Register,
  },
  {
    path: "/collections",
    exact: true,
    name: "ViewAuthor",
    component: ViewAuthor,
  },
  {
    path: "/collections/:slug",
    exact: true,
    name: "ViewBook",
    component: ViewBook,
  },
  {
    path: "/collections/:author/:book",
    exact: true,
    name: "BookDetail",
    component: BookDetail,
  },
  {
    path: "/cart",
    exact: true,
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    exact: true,
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/thank-you",
    exact: true,
    name: "Thankyou",
    component: Thankyou,
  },
  {
    path: "/loyalty",
    exact: true,
    name: "Loyalty",
    component: Loyalty,
  },
];

export default Publicroutelist;
