import "./App.css";
import Login from "./komponente/frontend/auth/Login";
import Register from "./komponente/frontend/auth/Register";
/*import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";*/
import Books from "./komponente/Books";
import NavBar from "./komponente/NavBar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Cart from "./komponente/Cart";
import AdminRoute from "./routes/AdminRoute";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./komponente/admin/Dashboard";
import Profile from "./komponente/admin/Profile";
import Home from "./komponente/frontend/Home";
import Page403 from "./komponente/error/Page403";
import Page404 from "./komponente/error/Page404";

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
  /*const [token, setToken] = useState();

  function addToken(auth_token) {
    setToken(auth_token);
  }

  const [cartNum, setCartNum] =
    useState(0);
  const [cartBooks, setCartBooks] =
    useState([]);

  const [books, setBooks] = useState();

  useEffect(() => {
    if (books == null) {
      axios.get("books").then((res) => {
        setBooks(res.data.books);
      });
    }
  }, [books]);

  function refresh() {
    let newBook = books.filter(
      (book) => book.amount > 0
    );
    setCartBooks(newBook);
  }
  function addToCart(title, id) {
    setCartNum(cartNum + 1);
    books.forEach((book) => {
      if (book.id === id) {
        console.log(
          "Dodat je proizvod:" + title
        );
        book.amount++;
        console.log(book.amount);
      }
    });
    refresh();
  }*/

  return (
    <Router className="App">
      <Switch>
        {/* <Route
          path="/admin"
          name="Admin"
          render={(props) => (
            <MasterLayout {...props} />
          )}
        />*/}
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          path="/403"
          component={Page403}
        />
        <Route
          path="/404"
          component={Page404}
        />
        {/*<Route
          path="/login"
          component={Login}
        />
        <Route
          path="/register"
          component={Register}
        />*/}
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
        <Route
          path="/books"
          component={Books}
        />
        {/* <Route
          path="/admin"
          name="Admin"
          render={(props) => (
            <MasterLayout {...props} />
          )}
          />*/}
        <AdminRoute
          path="/admin"
          name="Admin"
        />

        {/*<Route
          path="/admin"
          element={<MasterLayout />}
        />*/}
      </Switch>
    </Router>
    /* <BrowserRouter className="App">
      <NavBar
        token={token}
        cartNum={cartNum}
      />
      <Routes>
        <Route
          path="books"
          element={
            <Books
              addToCart={addToCart}
              books={books}
            />
          }
        />

        <Route
          path="cart"
          element={
            <Cart books={cartBooks} />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              addToken={addToken}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register></Register>
          }
        />
      </Routes>
    </BrowserRouter>*/
  );
}

export default App;
