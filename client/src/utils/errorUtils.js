import ShowToast from "@reusable/Toast";

/**
 * Utility function for logging the success on development environment
 * @param {*} message
 * @param {*} data
 */
export const logBuddy = (message = "logBuddy", data) => {
  if (import.meta.env.MODE === "development") {
    console.log("LogBuddy 🚀: ->", message, data || "");
  }
};

/**
 * Utility function for logging the error on development environment
 * @param {*} message
 * @param {*} error
 */
export const logError = (message = "Error", error) => {
  if (import.meta.env.MODE === "development") {
    console.log("LogError 👎 :angry: : ->", message, error);
  }
};

// Set to track shown error messages
const shownErrors = new Set();

const showError = (message, setError) => {
  setError(message);

  if (!shownErrors.has(message)) {
    ShowToast(message, "error");
    shownErrors.add(message);

    // Clear shownErrors after 5 seconds
    setTimeout(() => {
      shownErrors.delete(message);
    }, 5000);
  }
};

export const handleError = (error, setError) => {
  if (!error.response) {
    showError("Network Error", setError);
    return;
  }

  const { status, data } = error.response;

  // Log the entire data for debugging purposes
  logError("Error data:", data);

  const errorMapping = {
    "01": "Names should only contain letters",
    "02": "Username is already taken",
    "03": "Email is already registered",
    "04": "Password doesn't meet the requirements",
  };

  let errorMessage = "An error occurred";

  switch (status) {
    case 400:
      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((errorItem) => {
          errorMessage =
            errorMapping[errorItem.code] || errorItem.msg || "Validation error";
          showError(errorMessage, setError);
        });
      } else {
        errorMessage = data.error || "Validation error";
        showError(errorMessage, setError);
      }
      break;
    case 401:
      errorMessage =
        data.message === "Incorrect password"
          ? "Incorrect password"
          : "Unauthorized: General error";
      showError(errorMessage, setError);
      break;
    case 404:
      errorMessage = "Email not found";
      showError(errorMessage, setError);
      break;
    case 500:
      errorMessage = "Server error";
      showError(errorMessage, setError);
      break;
    default:
      errorMessage = data.error || "An error occurred";
      showError(errorMessage, setError);
      break;
  }
};
