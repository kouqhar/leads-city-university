import axios from "axios";

// Use Vite env variable for base URL
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosApi;
