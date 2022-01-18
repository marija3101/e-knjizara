import Dashboard from "../komponente/admin/Dashboard";
import Profile from "../komponente/admin/Profile";
import Author from "../komponente/admin/Author";
import ViewAuthor from "../komponente/admin/ViewAuthor";
import AddBook from "../komponente/admin/AddBook";
import ViewBook from "../komponente/admin/ViewBook";
import EditBook from '../komponente/admin/EditBook';
import EditAuthor from "../komponente/admin/EditAuthor";
import City from "../komponente/admin/City";
import ViewCity from "../komponente/admin/ViewCity";
import EditCity from "../komponente/admin/EditCity";
import Charts from "../komponente/Charts";

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
  {path:'/admin/edit-author/:id',
  exact:true,
  name:'EditAuthor',
  component: EditAuthor},
 
  {path:'/admin/edit-book/:id',
   exact:true, 
   name:'EditBook',
    component: EditBook},
    {path:'/admin/edit-city/:id',
    exact:true, 
    name:'EditCity',
     component: EditCity},
    {
      path: "/admin/city",
      exact: true,
      name: "City",
      component: City,
    },
    {
      path: "/admin/view-city",
      exact: true,
      name: "ViewCity",
      component: ViewCity,
    },
    {
      path: "/admin/charts",
      exact: true,
      name: "Charts",
      component: Charts,
    },

];

export default routes;
