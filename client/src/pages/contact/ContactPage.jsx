import "@styles/pages/pages-style.scss";
import { contactData, contactInfo } from "@data/contact/contactData";
import Input from "@reusable/Input";
import Textarea from "@reusable/TextArea";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";
import SocialMedia from "@reusable/SocialMeida";
import contactImage from "@images/contact/contact4.png";

export default function ContactPage() {
  // Filter textarea inputs
  const textAreaInput = contactData.filter((item) => item.type === "textarea");

  // Filter other input types (excluding textarea)
  const otherInputs = contactData.filter((item) => item.type !== "textarea");

  return (
    <div className="contact-page-container">
      <div className="contact-heading">
        <h2>Contact Us</h2>
      </div>

      <div className="contact-wrapper">
        <form className="contact-form">
          <p>
            Got questions? Fill out the form, and we’ll be in touch shortly to
            assist you!
          </p>
          {/* Render other input fields dynamically */}
          {otherInputs.map(
            ({ labelName, type, name, placeholder, required }) => (
              <Input
                key={name}
                labelName={labelName}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
              />
            )
          )}

          {/* Render textarea input dynamically */}
          {textAreaInput.map(({ name, labelName, placeholder, required }) => (
            <Textarea
              key={name}
              labelName={labelName}
              name={name}
              placeholder={placeholder}
              required={required}
            />
          ))}

          <Button
            type="submit"
            name="Send Message"
            iconLibrary="bi"
            iconName="BiSolidMessageRoundedDots"
            iconSize={20}
          />
        </form>

        {/* Render contact info dynamically */}
        <div className="contact-info">
          <div className="contact-image-wrapper">
            <img src={contactImage} />
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
            {/* Reusable SocialMedia Component */}
            <SocialMedia size={32} color="#e67e22" />
          </div>
        </div>
      </div>
    </div>
  );
}
