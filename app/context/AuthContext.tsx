"use client";

import {
  type Dispatch,
  createContext,
  useReducer,
  type ReactNode,
  useContext,
  useEffect,
} from "react";
import { type Action, Reducer, type Store } from "./Reducer";

type Reducer = (state: Store, action: Action) => Store;

export const initialState: Store = {
  user: {
    is_authenticated: false,
  },
};

export const AuthContext = createContext<{
  state: Store;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined"
        ? window.localStorage.getItem("user")
        : null;
    const initialUser = storedUser ? JSON.parse(storedUser) : initialState.user;

    dispatch({ type: "SET_USER", payload: initialUser });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: () => {
  state: Store;
  dispatch: (action: Action) => void;
} = () => {
  const { state, dispatch } = useContext(AuthContext);
  return { state, dispatch };
};
