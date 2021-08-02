import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../../firebase";

function Logout() {
  return (
    <div>
      <button className="btn btn-danger" onClick={() => auth.signOut()}>
        {" "}
        Logout
      </button>
    </div>
  );
}

export default Logout;
