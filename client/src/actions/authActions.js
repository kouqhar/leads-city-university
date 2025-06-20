import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axiosApi from "../api/axios";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axiosApi
    .post("/api/users/register", userData)
    .then((result) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get user Token
export const loginUser = (userData) => (dispatch) => {
  axiosApi
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage once token is gotten
      const { token } = res.data;

      // Set token to localStorage
      localStorage.setItem("jwtToken", token);

      // Set token to authorization header
      setAuthToken(token);

      // Decode the token to get the user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");

  // Remove the auth header for future requests
  setAuthToken(false);

  // Set the current user to an {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
