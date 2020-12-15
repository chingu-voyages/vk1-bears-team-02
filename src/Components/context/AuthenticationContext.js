import React, { createContext, useState } from "react";

export const AuthenticationContext = createContext(null);

export const AuthenticationProvider = (props) => {
  const [authenticated, setAuth] = useState(false);
  return (
    <AuthenticationContext.Provider value={{ authenticated, setAuth }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
