import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import React from "react";
import NavBar from "../../komponente/NavBar";
import Publicroutelist from "../../routes/Publicroutelist";


import {
  Switch,
  Route,
} from "react-router-dom";



const FrontendLayout = () => {
  return (
    <div >
  
      <NavBar />
      
        <div>
          
            <Switch>
              {Publicroutelist.map(
                (routedata, idx) => {
                  return (
                    routedata.component && (
                      <Route
                        key={idx}
                        path={
                            routedata.path
                        }
                        exact={
                            routedata.exact
                        }
                        name={
                            routedata.name
                        }
                        render={(
                          props
                        ) => (
                          <routedata.component
                            {...props}
                          />
                        )}
                      />
                    )
                  );
                }
              )}

           
            </Switch>
            

        </div>
      </div>

  );
};

export default FrontendLayout;