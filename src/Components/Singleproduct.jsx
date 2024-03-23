import React from "react";
import style from "../Css/Singleproduct.module.css";
import { useNavigate } from "react-router-dom";

const Singleproduct = ({ id, title, price, image }) => {
  const navigate = useNavigate();

  function handleNavigate(value) {
    navigate(`/prodesc/${value}`);
  }

  return (
    <div className={style.smalldiv}>
      <img className={style.image} src={image} alt="" />
      <h3>{title}</h3>
      <h4>{price}</h4>
      <button>Add to Cart</button>
      <button
        style={{ marginLeft: "20px" }}
        onClick={() => {
          handleNavigate(id);
        }}
      >
        View
      </button>
    </div>
  );
};

export default Singleproduct;
