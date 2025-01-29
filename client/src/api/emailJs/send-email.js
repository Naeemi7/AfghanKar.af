import axios from "axios";

export default async function sendEmail(name, email, message) {
  const emailJsEndpoint = "https://api.emailjs.com/api/v1.0/email/send";

  const payload = {
    service_id: import.meta.env.VITE_SERVICE_ID,
    template_id: import.meta.env.VITE_TEMPLATE_ID,
    user_id: import.meta.env.VITE_PUBLIC_KEY,
    template_params: {
      user_name: name,
      user_email: email,
      message_content: message,
      your_name: "Abdulwase Naeemi",
    },
  };

  try {
    const response = await axios.post(emailJsEndpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error("Error sending email:", errorMessage);
    throw new Error("Failed to send email");
  }
}
