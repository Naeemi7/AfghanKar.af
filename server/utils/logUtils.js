import dotenv from "dotenv";
dotenv.config();

/**
 * Utility function to display error console.log
 * @param {*} message
 * @param {*} error
 */
export const logError = (message = "Error", error) => {
  if (process.env.NODE_ENV === "development") {
    console.error("LogError 👎 😭 :->", message, error);
  }
};

/**
 * Utility function to display success console.log
 * @param {*} message
 * @param {*} data
 */
export const logBuddy = (message = "logBuddy", data) => {
  if (process.env.NODE_ENV === "development") {
    console.log("LogBuddy 🚀 :-> ", message, data || "");
  }
};
