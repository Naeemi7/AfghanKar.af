import api from "./axiosConfig";
import { handleError, logError } from "@utils/errorUtils";

const service = async (method, url, data = null, setError) => {
  try {
    const response = await api({
      method: method,
      url: url,
      data: data,
    });
    return response.data;
  } catch (error) {
    logError("Full error object:", error);
    handleError(error, setError);
    throw error;
  }
};

// Exported functions for different HTTP methods
export const get = async (url, setError) => {
  return service("get", url, null, setError);
};

export const post = async (url, data, setError) => {
  return service("post", url, data, setError);
};

export const put = async (url, data, setError) => {
  return service("put", url, data, setError);
};

export const remove = async (url, setError) => {
  return service("delete", url, null, setError);
};

export const patch = async (url, data, setError) => {
  return service("patch", url, data, setError);
};
