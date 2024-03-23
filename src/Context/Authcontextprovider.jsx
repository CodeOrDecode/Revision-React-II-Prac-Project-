import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = React.createContext();

const Authcontextprovider = ({ children }) => {
  const navigate = useNavigate()
  const [authstate, setAuthstate] = useState({
    token: null,
    isauth: false,
  });

  function login(value) {
    setAuthstate({
      token: value,
      isauth: true,
    });
    navigate("/")
  }

  function logout() {
    setAuthstate({
      token: null,
      isauth: false,
    });
  }

  return (
    <Authcontext.Provider value={{ authstate, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontextprovider;
