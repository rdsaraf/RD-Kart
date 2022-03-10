import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Fragment>
          {isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
          {isAdmin === true && user.role !== "admin" ? (
            <Navigate to='/login' />
          ) : (
            <Outlet />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
