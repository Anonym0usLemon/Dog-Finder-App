import axios from "axios";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: true,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "1");

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true)
    }
  }, [])

  function login() {
    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn(true);
  }

  function logout() {
    async function destroyCookie() {
      try {
        console.log("logging out")
        const loggedOut = await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {name: "logout", email: "logout@mail.com"}, {
          headers: {
              'Content-Type': 'application/json',
          },
          withCredentials: true, 
        });
        
        console.log(loggedOut); 
      } catch (error) {
        console.error("Error logging out", error);
      }
    }
    destroyCookie();
    localStorage.setItem("isLoggedIn", "0")
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: login,
        onLogout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
