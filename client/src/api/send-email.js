import axios from "axios";

export default async function sendEmail(name, email, message) {
  const emailJsEndpoint = process.env.NEXT_PUBLIC_EMAILJS_ENDPOINT;

  const templateParams = {
    service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    template_params: {
      user_name: name,
      user_email: email,
      message_content: message,
      your_name: "Abdulwase Naeemi",
    },
  };

  try {
    const response = await axios.post(emailJsEndpoint, templateParams, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Log and throw error for handling in the UI
    console.error(
      "Error sending email",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to send email");
  }
}
