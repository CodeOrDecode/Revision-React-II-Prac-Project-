import React, { useState } from "react";
import Singleproduct from "./Singleproduct";
import { useEffect } from "react";
import Loding from "../Extracomponents/Loding";
import Error from "../Extracomponents/Error";
import { useReducer } from "react";
import axios from "axios";
import style from "../Css/Singleproduct.module.css";
import { useSearchParams } from "react-router-dom";

const initialdata = {
  loading: false,
  error: false,
  data: [],
};

function datareducer(state, { type, payload }) {
  switch (type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case "ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case "SUCCESS": {
      return {
        ...state,
        data: payload,
        loading: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
}

const Products = () => {
  const [productdata, dispatch] = useReducer(datareducer, initialdata);



  const { data, loading, error } = productdata;
  const [search, setSearch] = useSearchParams()
  const [category, setCategory] = useState(search.get("category") || "all");



  function handlechange(event) {
    setCategory(event.target.value);
  }

  async function showdata() {
    let getObj = {};
    if (category != "all") {
      getObj["category"] = category;
    }
    dispatch({ type: "LOADING" });
    try {
      let { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_URL,
        params: getObj,
      });
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  }

  useEffect(() => {
    setSearch((prevSearch)=>{
      const newSearch = new URLSearchParams(prevSearch);
      newSearch.set("category",category)
      return newSearch;
    })
    showdata();
  }, [category]);

  if (loading) {
    return <Loding />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <select value={category} onChange={handlechange}>
        <option value="all">All</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
      </select>
      <div className={style.stylediv}>
        {data.length > 0 &&
          data.map((ele) => {
            return <Singleproduct key={ele.id} {...ele} />;
          })}
      </div>
      ;
    </>
  );
};

export default Products;
