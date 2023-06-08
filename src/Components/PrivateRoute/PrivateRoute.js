// PrivateRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";

const PrivateRoute = ({ component: RouteComponent, admin = false, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    console.log('currentUser:', currentUser); // Adicione este log
    console.log('admin:', admin); // Adicione este log

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser && (!admin || (currentUser.email === 'xxbaisch@gmail.com')) ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default PrivateRoute;
