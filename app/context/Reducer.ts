import { initialState } from "./AuthContext";

export interface User {
  is_authenticated: boolean;
}

export interface Store {
  user: User;
}

export interface Action {
  type: string;
  payload?: any;
}

export enum Actions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_USER = "SET_USER",
}

const Reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case Actions.LOGIN:
      localStorage.setItem(
        "user",
        JSON.stringify({ ...action.payload, is_authenticated: true })
      );

      return {
        ...state,
        user: {
          ...action.payload,
          is_authenticated: true,
        },
      };
    case Actions.LOGOUT:
      localStorage.removeItem("user");

      return { ...initialState };

    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export { Reducer };
