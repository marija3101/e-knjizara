import axios from "axios";
import React from "react";
import {
  Redirect,
  Route,
  useHistory
} from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout";
import {
  useState,
  useEffect,
} from "react";
import swal from "sweetalert";

const AdminRoute = ({ ...rest }) => {
  const history = useHistory();
  const [
    Authenticated,
    setAuthenticated,
  ] = useState(false);
  const [loading, setloading] =
    useState(true);
  useEffect(() => {
    axios
      .get("/api/checkingAuthenticated")
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
        }
        setloading(false);
      });
    return () => {
      setAuthenticated(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(
      err
    ) {
      if (err.response.status === 401) {
        swal(
          "Unauthorized",
          err.response.data.message,
          "warning"
        );
        history.push("/");
      }
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response.status === 403
      ) {
        swal(
          "Forbidden",
          error.response.data.message,
          "warning"
        );
        history.push("/403");
      } else if (
        error.response.status === 404
      ) {
        swal(
          "404 error",
          "URL/Page Not Found",
          "warning"
        );
        history.push("/404");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Route
      {...rest}
      render={({ props, location }) =>
 Authenticated ? (
          <MasterLayout {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
