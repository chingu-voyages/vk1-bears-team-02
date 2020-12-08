import React, { createContext, useState } from "react";

export const AuthenticationContext = createContext(null);

export const AuthenticationProvider = (props) => {
  const [authenticated, setAuth] = useState(true);
  return (
    <AuthenticationContext.Provider value={{ authenticated, setAuth }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
