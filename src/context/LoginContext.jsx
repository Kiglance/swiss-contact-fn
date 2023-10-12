import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export function useLoginData() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
}
