import axios from "axios";

// Determine BaseUrl baed on environment
const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:3001/api";
  } else {
    return import.meta.env.VITE_REACT_APP_BASE_URL;
  }
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

export default api;
