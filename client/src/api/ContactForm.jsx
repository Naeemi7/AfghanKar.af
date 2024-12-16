"use client";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import sendEmail from "@api/send-email";
import { isValidEmail } from "@utils/check-email";
import ShowToast from "@reusable/toast/Toast";

function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    isLoading: false,
    showThankYou: false, // New state for thank-you message
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formState.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    ShowToast("Loading...", "loading");

    try {
      await sendEmail(formState.name, formState.email, formState.message);
      ShowToast("Email sent successfully!", "success");

      setFormState((prevState) => ({
        ...prevState,
        name: "",
        email: "",
        message: "",
        isLoading: false,
        showThankYou: true, // Show thank-you message
      }));

      // Hide thank-you message after 3 seconds
      setTimeout(() => {
        setFormState((prevState) => ({
          ...prevState,
          showThankYou: false,
        }));
      }, 4000);
    } catch (error) {
      console.error("Error sending email:", error.message);
      ShowToast("Something went wrong while sending the email!", "error");
      setFormState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-secondaryColor text-xl uppercase">
        Contact me
      </p>

      <p className="text-md text-[#d3d8e8] mb-6">
        Feel free to reach out with any questions or work opportunities that
        match my skills and interests.
      </p>

      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <form className="mt-1 flex flex-col gap-4" onSubmit={handleSendMail}>
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name:</label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-secondaryColor ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              name="name"
              maxLength="100"
              required
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email:</label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-secondaryColor ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              name="email"
              maxLength="100"
              required
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message:</label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-secondaryColor ring-0 outline-0 transition-all duration-300 px-3 py-2"
              name="message"
              maxLength="500"
              required
              value={formState.message}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="flex justify-center">
            <button
              className={`flex items-center gap-1 rounded-full bg-gradient-to-r from-primaryColor to-iconColor px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold ${
                formState.isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
              disabled={formState.isLoading}
            >
              {formState.isLoading ? "Sending..." : "Send Message"}
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </form>

        {formState.showThankYou && (
          <div className="mt-4 text-center text-green-500 animate-slideInBounce">
            Thank you for reaching out! We will get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
