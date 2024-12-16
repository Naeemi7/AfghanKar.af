import api from "./axiosConfig";
import { handleError, logError } from "@utils/errorUtils";

const service = async (method, url, data = null, setError) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    logError("Full error object:", error);
    handleError(error, setError);
    throw error;
  }
};

// Exported functions for different HTTP methods
export const get = async (url, setError) => service("get", url, null, setError);
export const post = async (url, data, setError) =>
  service("post", url, data, setError);
export const put = async (url, data, setError) =>
  service("put", url, data, setError);
export const remove = async (url, setError) =>
  service("delete", url, null, setError);
export const patch = async (url, data, setError) =>
  service("patch", url, data, setError);
