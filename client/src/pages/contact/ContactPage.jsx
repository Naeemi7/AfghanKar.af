import { useState } from "react";
import "@styles/pages/pages-style.scss";
import { contactData, contactInfo } from "@data/contact/contactData";
import sendEmail from "@api/emailJs/send-email";
import Input from "@reusable/Input";
import Textarea from "@reusable/TextArea";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import SocialMedia from "@reusable/SocialMeida";
import contactImage from "@images/contact/contact4.png";
import ShowToast from "@reusable/ShowToast";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    message: "",
    isLoading: false,
    showThankYou: false,
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    ShowToast("Sending email...", "loading");

    try {
      await sendEmail(formState.fullName, formState.email, formState.message);

      ShowToast("Email sent successfully!", "success");
      setFormState({
        fullName: "",
        email: "",
        message: "",
        isLoading: false,
        showThankYou: true,
      });

      setTimeout(() => {
        setFormState((prevState) => ({ ...prevState, showThankYou: false }));
      }, 4000);
    } catch (error) {
      console.error("Error sending email:", error.message);
      ShowToast("Failed to send email. Please try again!", "error");
      setFormState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-heading">
        <h2>Contact Us</h2>
      </div>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSendMail}>
          <p>
            Got questions? Fill out the form, and we’ll be in touch shortly to
            assist you!
          </p>

          {contactData.map(({ labelName, type, name, placeholder, required }) =>
            type === "textarea" ? (
              <Textarea
                key={name}
                labelName={labelName}
                name={name}
                value={formState[name]}
                placeholder={placeholder}
                required={required}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                key={name}
                labelName={labelName}
                type={type}
                name={name}
                value={formState[name]}
                placeholder={placeholder}
                required={required}
                onChange={handleInputChange}
              />
            )
          )}

          <Button
            type="submit"
            name={formState.isLoading ? "Sending..." : "Send Message"}
            iconLibrary="bi"
            iconName="BiSolidMessageRoundedDots"
            iconSize={20}
            disabled={formState.isLoading}
            aria-busy={formState.isLoading ? "true" : "false"}
          />
        </form>

        {formState.showThankYou && (
          <p className="thank-you-message">
            Thank you for getting in touch! We’ll respond soon.
          </p>
        )}

        <div className="contact-info">
          <div className="contact-image-wrapper">
            <img src={contactImage} alt="Contact us" />
          </div>

          {contactInfo.map(({ id, library, iconName, labelName }) => (
            <div key={id} className="contact-icon-container">
              <Icon
                library={library}
                name={iconName}
                className="contact-icon"
              />
              <span>{labelName}</span>
            </div>
          ))}

          <div className="contact-social-media-icons">
            <SocialMedia size={32} color="#e67e22" />
          </div>
        </div>
      </div>
    </div>
  );
}
