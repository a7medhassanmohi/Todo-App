import React, { useState, useEffect, useContext, useRef } from "react";
import { firebase } from "../../../firebase";
import { Authcontext } from "../../Authcontect/Authcontext";

import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

function Listnote(props) {
  const [listvalues, setlistvalues] = useState([]);

  const [isfav, setisfav] = useState(false);
  const currentuser = useContext(Authcontext);
  const tagsspan = useRef(null);

  useEffect(() => {}, []);
  // console.log(listvalues);

  return (
    <>
      <div className="row">
        <div className={` col-11  list  ${props.navopen ? "open" : null}  `}>
          <h2 className="listtitle">
            {props.linkActive == "favourit"
              ? "favorite"
              : props.linkActive == "allnote"
              ? "allnote"
              : "allnote"}
          </h2>
          <AnimatePresence>
            {props.listvalues.map((item, i) => {
              return (
                <motion.div
                  className="list-item mb-3 "
                  key={i}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <div className="list-left">
                    <input
                      type="checkbox"
                      name="done"
                      className=""
                      onChange={(e) => props.handleDone(e, item.id, i)}
                      checked={item.done}
                    />
                    <div className="list-info">
                      <h4 className={`title ${item.done ? "done" : null}`}>
                        {item.title}
                      </h4>
                      <p className={`desc ${item.done ? "done" : null}`}>
                        {item.desc}
                      </p>
                      <div className="listtags">
                        {item.tages &&
                          item.tages.map((tag, index) => {
                            return (
                              <div className="tagitem" key={index}>
                                <span className={`tag ${tag}`}>
                                  <span></span> {tag}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="listbtns">
                    <AiFillStar
                      className={`fav ${item.favorite ? "favourite" : null}`}
                      onClick={(e) => props.handlefavorite(e, item.id, i)}
                    />
                    <RiDeleteBin5Line
                      className="del"
                      onClick={() => props.handledelete(item.id)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Listnote;

{
  /* <div className="listnote">
<div className="listcontent">
  {listvalues.map((item, i) => {
    return (
      <div className="list-item mb-3" key={i}>
        <div className="list-info">
          <input
            type="checkbox"
            name="done"
            className="done d-inline-block mr-3"
            onClick={(e) => handleDone(e, item.id)}
            checked={item.done ? true : false}
          />
          <div className="list-info-content d-inline-block">
            <h2 className={`title ${item.done ? "done" : null}`}>
              {item.title}{" "}
            </h2>
            <p className={`w-75 ${item.done ? "done" : null}`}>
              {item.desc}
            </p>
          </div>
        </div>
        <div className="listbtn">
          {item.tages &&
            item.tages.map((tag, i) => {
              return (
                <div className="tags mr-2">
                  <span className={`d-inline-block `}>
                    {" "}
                    <span className={tag}></span> {tag}
                  </span>
                </div>
              );
            })}

          <AiFillStar
            className={`star ${item.favorite ? "fav" : null}`}
            onClick={(e) => handlefavorite(e, item.id, i)}
          />
          <RiDeleteBin5Line
            className="delete"
            onClick={() => handledelete(item.id)}
          />
        </div>
      </div>
    );
  })}
</div>
</div> */
}
