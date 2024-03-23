import React from "react";
import { Authcontext } from "../Context/Authcontextprovider";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const {
    authstate: { isauth },
  } = React.useContext(Authcontext);
  console.log(isauth);
  if (!isauth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
