import api from "./axiosConfig";
import { logBuddy, logError } from "@utils/errorUtils";

// Function to setup intercepters
export default function setupInterceptors() {
  api.interceptors.request.use(
    (req) => {
      logBuddy("A request has been made");
      return req;
    },
    (error) => {
      logError("An error occurred during the request", error.response);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (res) => {
      logBuddy("A response has been received");
      return res;
    },
    (error) => {
      logError("An error occurred while receiving a response", error.response);

      // Handle 401 errors
      if (error.response && error.response.status === 401) {
        if (error.response.data.error === "Incorrect password") {
          logError("401 Interceptor exception: incorrect password");
        } else {
          logError("401 Interceptor:", error.response.data.error);
          window.location.href = "/user-logout";
        }
      }

      return Promise.reject(error);
    }
  );
}
