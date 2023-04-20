import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const authInitialState = localStorage.getItem("AuthToken") ? true : false;

  const [isAuth, setIsAuth] = useState(authInitialState);
  const [isErr, setIsErr] = useState(false);

  const loginHandler = async (email, password) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("AuthToken", response.data.encodedToken);
      localStorage.setItem("AuthUser", JSON.stringify(response.data.foundUser));
      setIsAuth(true);
    } catch (error) {
      console.error(error);
      setIsErr(true);
    }
  };

  const signupHandler = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      localStorage.setItem("AuthToken", response.data.encodedToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, loginHandler, signupHandler, isErr }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
