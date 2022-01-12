import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

import routes from "../../routes/routes";

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <NavBar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideBar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Switch>
              {routes.map(
                (route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={
                          route.path
                        }
                        exact={
                          route.exact
                        }
                        name={
                          route.name
                        }
                        render={(
                          props
                        ) => (
                          <route.component
                            {...props}
                          />
                        )}
                      />
                    )
                  );
                }
              )}
              {/* <Route
                path="/admin"
                element={
                  <Redirect to="/admin/dashboard" />
                }
              
              />*/}
              <Redirect
                form="/admin"
                to="/admin/dashboard"
              />
            </Switch>
            {/* <Routes>
              {routes
                .filter(
                  (route) =>
                    route.component
                )
                .map(
                  (
                    {
                      path,
                      component:
                        Component,
                    },
                    idx
                  ) => (
                    <Route
                      key={idx}
                      path={path}
                      element={
                        <Component />
                      }
                    />
                  )
                )}
              <Route
                path="/admin"
                element={
                  <Navigate to="/admin/dashboard" />
                }
              />
              </Routes>*/}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
