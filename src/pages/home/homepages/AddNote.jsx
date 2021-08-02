import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useState, useContext } from "react";
import { firebase } from "../../../firebase";
import { Authcontext } from "../../Authcontect/Authcontext";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const inialvalue = {
  title: "",
  desc: "",
  time: "",
  done: false,
  favorite: false,
  tages: [],
};
let x = [];
function AddNote({ props }) {
  const currentuser = useContext(Authcontext);
  const [values, setvalues] = useState({
    title: "",
    desc: "",
    time: "",
    done: false,
    favorite: false,
    tages: [],
  });
  const [tagvalue, settagvalue] = useState([]);

  function checkboxvalue(e) {
    if (e.target.checked == true) {
      x = [...x, e.target.value];

      setvalues({ ...values, tages: x });
    } else {
      const no = x.indexOf(e.target.value);
      x.splice(no, 1);

      setvalues({ ...values, tages: x });
    }
  }
  function handlechange(e) {
    setvalues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const firestore = firebase.database().ref(`/${currentuser.uid}`);
    firestore.push(values);
    setvalues(inialvalue);
    props.setrefreshpage(props.refreshpage + 1);
    x = [];
    props.setboxopen(false);
  }
  console.log(currentuser);
  return (
    <AnimatePresence>
      <motion.div
        className={`addnote `}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
      >
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="addcontent">
              <h2 className="my-3 ">Add Task</h2>
              <form method="POST" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control w-75 "
                  onChange={handlechange}
                  value={values.title}
                />
                <h3 className="my-3">Tags</h3>
                <div className="checkbox">
                  <label>Desgin</label>
                  <input
                    type="checkbox"
                    name="tags"
                    value="Desgin"
                    className="mx-2"
                    onChange={checkboxvalue}
                  />
                  <label>ForntEnd</label>
                  <input
                    type="checkbox"
                    name="tags"
                    value="ForntEnd"
                    className="mx-2"
                    onChange={checkboxvalue}
                  />
                  <label>backEnd</label>
                  <input
                    type="checkbox"
                    name="tags"
                    value="backEnd"
                    className="mx-2"
                    onChange={checkboxvalue}
                  />
                  <label>issue</label>
                  <input
                    type="checkbox"
                    name="tags"
                    value="issue"
                    className="mx-2 "
                    onChange={checkboxvalue}
                  />
                </div>
                <textarea
                  name="desc"
                  placeholder="Description"
                  className="form-control my-3 w-75 "
                  rows="4"
                  onChange={handlechange}
                  value={values.desc}
                />

                <button className="btn btn-outline-danger w-75 ">Add</button>
              </form>
              <div
                className="closebtn position-absolute "
                onClick={() => props.setboxopen(!props.boxopen)}
              >
                <GrFormClose onClick={() => (x = [])} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddNote;

{
  /* <form method="POST">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control w-75 mx-auto"
            />
            <h3>Tags</h3>
            <label>Desgin</label>
            <input type="checkbox" name="Desgin" value="Desgin" />
            <label>ForntEnd</label>
            <input type="checkbox" name="ForntEnd" value="ForntEnd" />
            <label>backEnd</label>
            <input type="checkbox" name="backEnd" value="ForntEnd" />
            <label>issue</label>
            <input
              type="checkbox"
              name="issue"
              value="issue"
              className="form-control"
            />
          </form> */
}
