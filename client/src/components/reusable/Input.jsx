import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function Input({
  labelName,
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  autocomplete = "",
}) {
  // Check if label is required (contains a star)
  const isRequired = labelName.includes("*");

  // Remove the asterisk from the label text
  const labelText = labelName.replace("*", "").trim();

  // Generate a sanitized ID for the input
  const inputId = labelName.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="input-box">
      <label htmlFor={inputId}>
        {labelText}
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        className={className}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete={autocomplete} // Pass autocomplete to input
      />
    </div>
  );
}

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  autocomplete: PropTypes.string, // PropType for autocomplete
};
