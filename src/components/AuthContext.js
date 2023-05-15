import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
