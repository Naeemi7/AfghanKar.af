import "@styles/pages/pages-style.scss";
import { contactData, contactInfo } from "@data/contact/contactData";
import Input from "@reusable/Input";
import Textarea from "@reusable/TextArea";
import Button from "@reusable/Button";
import Icon from "@reusable/Icon";

export default function ContactPage() {
  // Filter textarea inputs
  const textAreaInput = contactData.filter((item) => item.type === "textarea");

  // Filter other input types (excluding textarea)
  const otherInputs = contactData.filter((item) => item.type !== "textarea");

  return (
    <div className="contact-page-container">
      <h1>Contact Us</h1>

      <div className="contact-wrapper">
        <form className="contact-form">
          {/* <p className="contact-page-description">
            Whether you’re a job seeker with questions or a recruiter looking
            for support, we’re here to help. Fill out the form below, and our
            team will get back to you promptly.
          </p> */}
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
          {contactInfo.map(({ id, library, iconName, labelName }) => (
            <div key={id} className="contact-icon-wrapper">
              <Icon
                library={library}
                name={iconName}
                className="contact-icon"
              />
              <span>{labelName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
