import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

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
            
              <Redirect
                form="/admin"
                to="/admin/dashboard"
              />
            </Switch>

          </main>
     
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
