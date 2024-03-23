import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Prodesc = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  async function getSingleData() {
    try {
      let { data } = await axios({
        method: "get",
        url: `http://localhost:3000/products/${id}`,
      });
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div style={{padding:"24px"}}>
      {data && <img style={{width:"180px"}} src={data.image} alt="" />}
      {data && <h2>{data.title}</h2>}
      {data && <h3>{data.description}</h3>}
      {data && <h4>{data.price}</h4>}
      <button>Add to Cart</button>
    </div>
  );
};

export default Prodesc;
