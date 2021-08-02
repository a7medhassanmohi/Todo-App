import React from "react";
import { auth } from "../../firebase";
import logo from "../../assets/logotype.svg";
import { MdEventNote } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

function Sidenav(props) {
  return (
    <div className={`nav-content ${props.navopen ? "open" : null}   `}>
      <div className="navitem">
        <img src={logo} alt="" className="img-fluid" />
        <h2>arion</h2>
      </div>
      <div
        className="navitem"
        onClick={(e) => props.allfilter(e)}
        ref={props.allnoteref}
      >
        <MdEventNote />
        <h2>AllNote</h2>
      </div>
      <div
        className="navitem"
        ref={props.favnoteref}
        onClick={(e) => props.favfilter(e)}
      >
        <AiFillStar />
        <h2>Favourit</h2>
      </div>
      <div className="navitem" onClick={() => props.setboxopen(true)}>
        <BiCommentAdd />
        <h2>Addnote</h2>
      </div>
      <div className="navitem" onClick={() => auth.signOut()}>
        <IoLogOutOutline />
        <h2>LogOut</h2>
      </div>
    </div>
  );
}

export default Sidenav;
