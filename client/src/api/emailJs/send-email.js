import axios from "axios";

export default async function sendEmail(name, email, message) {
  const emailJsEndpoint = "https://api.emailjs.com/api/v1.0/email/send";

  const payload = {
    service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    template_params: {
      user_name: name,
      user_email: email,
      message_content: message,
      your_name: "Abdulwase Naeemi", // Replace with your name or customize
    },
  };

  try {
    const response = await axios.post(emailJsEndpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // If successful, EmailJS returns status info
  } catch (error) {
    console.error(
      "Error sending email",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to send email");
  }
}
