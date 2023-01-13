import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let isAuthenticated = localStorage.getItem("Meteor.loginToken");
    if (isAuthenticated != null) {
        return children;
    }
    return <Navigate to="/login" />;
};
export default PrivateRoute;
