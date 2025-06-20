import axios from "axios";
import axiosApi from "../api/axios";

const setAuthToken = (token) => {
  if (token) {
    // If token exist, Apply token to every request
    axiosApi.defaults.headers.common["Authorization"] = token;
  } else {
    // If the token doesn't exist, Delete the authentication header
    delete axiosApi.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
