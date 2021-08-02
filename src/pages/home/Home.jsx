import React, { useState, useEffect, useContext, useRef } from "react";
import { auth } from "../../firebase";
import { Authcontext } from "../Authcontect/Authcontext";
import Logout from "./homepages/logout";
import AddNote from "./homepages/AddNote";
import Listnote from "./homepages/Listnote";
import { firebase } from "../../firebase";
import "./home.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { MdEventNote } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Prsonprofile from "../../assets/tom-morel-hkbQnC7FAqU-unsplash.jpg";
import logo from "../../assets/logotype.svg";

import Topnav from "../nav/Topnav";
import Sidenav from "../nav/Sidenav";
import { Namecontext } from "../../App";

function Home(props) {
  const allnoteref = useRef(null);
  const favnoteref = useRef(null);
  const username = useContext(Namecontext);

  const [listvalues, setlistvalues] = useState([]);
  const [alllist, setalllist] = useState([]);
  const [favlist, setfavlist] = useState([]);
  const [linkActive, setlinkActive] = useState([]);
  const [boxopen, setboxopen] = useState(false);
  const currentuser = useContext(Authcontext);
  const [refreshpage, setrefreshpage] = useState(0);
  const [navopen, setnavopen] = useState(false);

  function handledelete(id) {
    console.log(id);
    const firestore = firebase.database().ref(`/${currentuser.uid}`);
    firestore.child(id).remove();
    setrefreshpage(refreshpage + 1);
  }

  function handleDone(e, id, i) {
    const firestore = firebase.database().ref(`/${currentuser.uid}`);

    firestore.child(id).update({ done: !listvalues[i].done });
    console.log("done");
    setrefreshpage(refreshpage + 1);
  }

  function handlefavorite(e, id, i) {
    const firestore = firebase.database().ref(`/${currentuser.uid}`);
    firestore.child(id).update({ favorite: !listvalues[i].favorite });

    setrefreshpage(refreshpage + 1);
  }
  function favfilter(e) {
    // const favfilterr = listvalues.filter((item) => item.favorite == true);
    allnoteref.current.classList.remove("active");
    favnoteref.current.classList.add("active");
    // setlistvalues(favfilterr);
    setrefreshpage(refreshpage + 1);

    setlinkActive(["favourit"]);
  }
  function allfilter(e) {
    allnoteref.current.classList.add("active");
    favnoteref.current.classList.remove("active");
    setrefreshpage(refreshpage + 1);

    // setlistvalues(alllist);
    setlinkActive(["allnote"]);
  }

  useEffect(() => {
    // console.log(currentuser);
    let userinfo = [];
    const firestore = firebase.database().ref(`/${currentuser.uid}`);
    firestore.on("value", (res) => {
      const data = res.val();
      for (let id in data) {
        userinfo.push({
          id: id,
          desc: data[id].desc,
          done: data[id].done,
          favorite: data[id].favorite,
          tages: data[id].tages,
          time: data[id].time,
          title: data[id].title,
        });
      }
      setalllist(userinfo);
      if (allnoteref?.current?.classList.contains("active")) {
        setlistvalues(userinfo);

        userinfo = [];
        console.log("all");
        console.log(listvalues);
      } else if (favnoteref?.current?.classList.contains("active")) {
        const favlist = alllist.filter((item) => item.favorite);
        setlistvalues(favlist);
        userinfo = [];

        // console.log(favlist);
        // console.log(listvalues);
        // console.log("fav");
      } else {
        setlistvalues(userinfo);
        userinfo = [];
        console.log("allllll");
      }
    });
  }, [refreshpage]);

  return (
    <div className="home">
      <Topnav navopen={navopen} setnavopen={setnavopen} />

      {boxopen ? (
        <AddNote props={{ boxopen, setboxopen, refreshpage, setrefreshpage }} />
      ) : null}

      <Sidenav
        navopen={navopen}
        setnavopen={setnavopen}
        favfilter={favfilter}
        allnoteref={allnoteref}
        favnoteref={favnoteref}
        allfilter={allfilter}
        setboxopen={setboxopen}
        boxopen={boxopen}
      />
      <button
        onClick={() => setboxopen(!boxopen)}
        className="addnotbtn btn btn-outline-primary"
      >
        Add
      </button>

      <Listnote
        navopen={navopen}
        setnavopen={setnavopen}
        setlistvalues={setlistvalues}
        listvalues={listvalues}
        handledelete={handledelete}
        handleDone={handleDone}
        handlefavorite={handlefavorite}
        linkActive={linkActive}
      />
    </div>
  );
}

export default Home;

{
  /* <Listnote
            props={{
              boxopen,
              setboxopen,
              refreshpage,
              setrefreshpage,
            }} */
}

{
  /* <svg id="icon-move" viewBox="0 0 9 24">
              <circle cx="1.5" cy="1.5" r="1.5"></circle>
              <circle cx="1.5" cy="8.5" r="1.5"></circle>
              <circle cx="1.5" cy="15.5" r="1.5"></circle>
              <circle cx="1.5" cy="22.5" r="1.5"></circle>
              <circle cx="7.5" cy="1.5" r="1.5"></circle>
              <circle cx="7.5" cy="8.5" r="1.5"></circle>
              <circle cx="7.5" cy="15.5" r="1.5"></circle>
              <circle cx="7.5" cy="22.5" r="1.5"></circle>
            </svg> */
}
