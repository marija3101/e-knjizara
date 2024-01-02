import "./App.scss";
import Login from "./komponente/frontend/auth/Login";
import Register from "./komponente/frontend/auth/Register";

import axios from "axios";


import AdminRoute from "./routes/AdminRoute";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Page403 from "./komponente/error/Page403";
import Page404 from "./komponente/error/Page404";
import PublicRoute from "./PublicRoute";



import ViewAuthor from "./komponente/admin/ViewAuthor";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';







axios.defaults.baseURL =
  "http://127.0.0.1:8000/";
axios.defaults.headers.post[
  "Content-Type"
] = "application/json";
axios.defaults.headers.post["Accept"] =
  "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(
      "auth_token"
    );
    config.headers.Authorization = token
      ? `Bearer ${token}`
      : "";
    return config;
  }
);

function App() {


  return (
    <Router className="App">
      <Switch>

        <AdminRoute
          path="/admin"
          name="Admin"
        />

       <Route
          path="/403"
          component={Page403}
        />

       <Route
          path="/404"
          component={Page404}
        />

         <Route
          path="/collections"
          component={ViewAuthor}
        />
        <PublicRoute path="/" name="Home"/>
       
        
        
        
     
         <Route path="/login">
          {localStorage.getItem(
            "auth_token"
          ) ? (
            <Redirect to="/" />
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/register">
          {localStorage.getItem(
            "auth_token"
          ) ? (
            <Redirect to="/" />
          ) : (
            <Register />
          )}
          </Route>


      </Switch>
    </Router>

  );
}

export default App;
