import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./login.css";
import { auth } from "../../firebase";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Authcontext } from "../Authcontect/Authcontext";
import { name } from "../register/Register";
import { Namecontext } from "../../App";

const initalValue = {
  email: "",
  password: "",
};
function Login(props) {
  const user = useContext(Authcontext);
  const username = useContext(Namecontext);

  const history = useHistory();

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState(null);

  function handlechange(e) {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(inputs.email, inputs.password);
      setinputs(initalValue);
      seterror(null);
      history.push("/home");
    } catch (error) {
      seterror(error.message);
    }
  }

  return (
    <div className="login ">
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="login-content     ">
              <div className="login-inputs bg-blue">
                <form method="Post" onSubmit={handlesubmit}>
                  <h3 className="w-75 mx-auto">Welcome to Arion</h3>
                  <p className="w-75 mx-auto">
                    Welcome Back, Please login to your account.
                  </p>
                  <div className="inputgroup w-75 mx-auto">
                    <BsFillPersonFill className="emailicon" />
                    <input
                      className="form-control  mb-3"
                      type="text"
                      name="email"
                      placeholder="example@mail.com"
                      onChange={handlechange}
                      value={inputs.email}
                    />
                  </div>
                  <div className="inputgroup w-75 mx-auto">
                    <RiLockPasswordLine className="passwordicon" />
                    <input
                      className="form-control "
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handlechange}
                      value={inputs.password}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-outline-info w-75 mx-auto my-3"
                  >
                    login
                  </button>
                  <p className="w-75 mx-auto">
                    if you dont have acco <Link to="/register">register</Link>{" "}
                  </p>
                </form>
                <p className="bg-danger">{error ? error : null}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
