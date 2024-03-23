import axios from "axios";
import React, { useContext } from "react";
import { useReducer } from "react";
import { Authcontext } from "../Context/Authcontextprovider";
import Loding from "../Extracomponents/Loding";
import Error from "../Extracomponents/Error";

const initialState = {
  email: "",
  password: "",
  loading: false,
  error: false,
};

function formreducer(state, { type, payload }) {
  switch (type) {
    case "EMAIL": {
      return {
        ...state,
        email: payload,
      };
    }

    case "PASSWORD": {
      return {
        ...state,
        password: payload,
      };
    }

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
        loading: false,
        error: false,
      };
    }

    case "RESET": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

const Login = () => {
  const { login } = React.useContext(Authcontext);
  const [formdata, dispatch] = useReducer(formreducer, initialState);

  const { email, password, loading, error } = formdata;

  async function handleSubmit(event) {
    event.preventDefault();
    let obj = { email: email, password: password };
    dispatch({ type: "LOADING" });
    try {
      let { data } = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: obj,
      });
      console.log(data);
      dispatch({ type: "SUCCESS" });
      login(data.token);
      dispatch({ type: "RESET" });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  }

  if (loading) {
    return <Loding />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={formdata.email}
          onChange={(e) => {
            dispatch({ type: "EMAIL", payload: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={formdata.password}
          onChange={(e) => {
            dispatch({ type: "PASSWORD", payload: e.target.value });
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
