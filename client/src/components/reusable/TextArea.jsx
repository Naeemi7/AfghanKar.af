import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function Textarea({ labelName, name, placeholder, value }) {
  // Check if label is required (contains a star)
  const isRequired = labelName.includes("*");

  // Remove the asterisk from the label text
  const labelText = labelName.replace("*", "").trim();

  return (
    <div className="text-area-container">
      <label htmlFor={labelName.replace(" ", "-").toLowerCase()}>
        {labelText}
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        className="form-control"
      />
    </div>
  );
}

Textarea.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};
