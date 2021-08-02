import React from "react";
import logo from "../../assets/logotype.svg";
import Prsonprofile from "../../assets/tom-morel-hkbQnC7FAqU-unsplash.jpg";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoIosPerson } from "react-icons/io";
import { auth } from "../../firebase";

function Topnav(props) {
  return (
    <div className={`topnav ${props.navopen ? "open" : null}`}>
      <div className="topnavlog">
        <img src={logo} alt="" />
        <HiOutlineMenuAlt1
          onClick={() => props.setnavopen(!props.navopen)}
          className="menu ml-2"
        />
      </div>

      <div className="userinfo">
        <div className="img mr-3">
          {/* <img src={Prsonprofile} className="img-fluid" alt="" /> */}
          <IoIosPerson />
        </div>

        <IoLogOutOutline className="logout" onClick={() => auth.signOut()} />
      </div>
    </div>
  );
}

export default Topnav;
