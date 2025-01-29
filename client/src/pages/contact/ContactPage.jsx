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
import useUserContext from "@hooks/useUserContext";
import useFormattedName from "@hooks/useFormattedName";

export default function ContactPage() {
  const { setError, loading, setLoading } = useUserContext();
  const { formatName } = useFormattedName();

  const handleSendMail = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rawFullName = formData.get("fullName");
    const email = formData.get("email");
    const message = formData.get("message");

    setError("");
    setLoading(true); // Start loading spinner

    const { fullName } = formatName(rawFullName);
    try {
      await sendEmail(fullName, email, message);
      ShowToast("Email sent successfully!", "success");
    } catch (error) {
      console.error("Error sending email:", error.message);
      ShowToast("Failed to send email. Please try again!", "error");
    } finally {
      setLoading(false); // Stop loading spinner
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

          {contactData.map(
            ({ labelName, type, name, placeholder, required }) => {
              const Component = type === "textarea" ? Textarea : Input;
              return (
                <Component
                  key={name}
                  labelName={labelName}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                />
              );
            }
          )}

          <Button
            type="submit"
            name={loading ? "Sending..." : "Send Message"}
            iconLibrary="bi"
            iconName="BiSolidMessageRoundedDots"
            iconSize={20}
            disabled={loading}
            aria-busy={loading ? "true" : "false"}
          />
        </form>

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
