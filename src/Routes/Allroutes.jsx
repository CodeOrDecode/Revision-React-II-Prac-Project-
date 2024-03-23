import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Product from "../Components/Products";
import Private from "../Private/Private";
import Prodesc from "../Components/Prodesc";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />

        <Route path="/login" element={<Login />} />
        
        <Route
          path="/product"
          element={
            <Private>
              <Product />
            </Private>
          }
        />

        <Route
          path="/prodesc/:id"
          element={
            <Private>
              <Prodesc />
            </Private>
          }
        />
      </Routes>
    </div>
  );
};

export default Allroutes;
