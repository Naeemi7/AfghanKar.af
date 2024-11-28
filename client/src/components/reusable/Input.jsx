import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";
import { useRef } from "react";

export default function Input({
  labelName,
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  autocomplete = "",
}) {
  // Reference to the input element
  const inputRef = useRef(null);

  // Check if label is required (contains a star)
  const isRequired = labelName.includes("*");

  // Remove the asterisk from the label text
  const labelText = labelName.replace("*", "").trim();

  // Generate a sanitized ID for the input
  const inputId = labelName.replace(/\s+/g, "-").toLowerCase();

  // Function to handle input click and trigger the date picker
  const handleClick = () => {
    if (inputRef.current && inputRef.current.type === "date") {
      inputRef.current.showPicker(); // Trigger the date picker
    }
  };

  return (
    <div className={`input-box ${type === "date" ? "date-input" : ""}`}>
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
        ref={inputRef} // Attach the ref to the input element
        onClick={handleClick} // Trigger the date picker on click
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
