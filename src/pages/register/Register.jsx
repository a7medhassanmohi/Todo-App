import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { auth } from "../../firebase";
import { Authcontext } from "../Authcontect/Authcontext";
import { Namecontext } from "../../App";

const initalValue = {
  email: "",
  password: "",
  name: "",
};
export let name;
function Register(props) {
  const history = useHistory();
  const users = useContext(Authcontext);
  const namecont = useContext(Namecontext);
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
    name: "",
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
      await auth.createUserWithEmailAndPassword(inputs.email, inputs.password);
      namecont.namess = inputs.name;
      setinputs(initalValue);
      history.push("/login");
    } catch (error) {
      seterror(error.message);
    }
  }
  // console.log(namecont);

  return (
    <div className="register ">
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="login-content     ">
              <div className="login-inputs bg-blue">
                <form method="Post" onSubmit={handlesubmit}>
                  <h3 className="w-75 mx-auto mb-3">Create Account</h3>

                  <div className="inputgroup w-75 mx-auto">
                    <BsFillPersonFill className="emailicon" />
                    <input
                      className="form-control  mb-3"
                      type="text"
                      name="name"
                      placeholder="name"
                      onChange={handlechange}
                      value={inputs.name}
                    />
                  </div>

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
                    if you have acco <Link to="/login">Login</Link>{" "}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
