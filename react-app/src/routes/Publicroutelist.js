import Home from "../komponente/frontend/Home";
import About from "../komponente/frontend/About";
import ViewAuthor from "../layouts/frontend/collections/ViewAuthor";
import Login from "../komponente/frontend/auth/Login";
import Register from "../komponente/frontend/auth/Register";
import ViewBook from "../layouts/frontend/collections/ViewBook";
import BookDetail from "../layouts/frontend/collections/BookDetail";
import Cart from  "../komponente/frontend/Cart";



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
      {path:'/collections', exact:true, name:'ViewAuthor', component:ViewAuthor},
      {path:'/collections/:slug', exact:true, name:'ViewBook', component: ViewBook},
      {path:'/collections/:author/:book', exact:true, name:'BookDetail', component: BookDetail},
      {path:'/cart', exact:true, name:'Cart', component: Cart},
      {path:'/map', exact:true, name:'Map', component: Map },
      

 ];

    export  default Publicroutelist;