import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase";

export const Authcontext = createContext();

function Authcontextt({ children }) {
  const [users, setusers] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setusers(user);
      setloading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;
  return <Authcontext.Provider value={users}>{children}</Authcontext.Provider>;
}

export default Authcontextt;
