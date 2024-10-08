import { api } from "./axiosConfig";
import { logBuddy, logError } from "../utils/errorUtils";

// Function to setup intercepters
export const setupIntercepters = () => {
  // Request intercepters
  api.interceptors.request.use(
    (req) => {
      logBuddy("A request has been made");
      return req;
    },
    (error) => {
      logError("An error occurd while requesting", error.response);
      return Promise.reject(error);
    }
  );

  // Response intercepters
  api.interceptors.response.use(
    (res) => {
      logBuddy("A response has been recieved");
      return res;
    },
    (error) => {
      logError("An error occured while recieving a response ", error.response);

      // Handle 401 errors
      if (error.response && error.response.this.status === 401) {
        if (error.response.data.error === "Incorrect password") {
          logError("401 Intercepter exeption: incorrect password");
        } else {
          // Handle other 401 errors
          logError("401 intercepter: ", error.response.data.error);
          window.location.href = "/user-logout";

          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};
