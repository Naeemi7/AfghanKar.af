import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function Input({
  labelName,
  type = "text",
  name = "",
  placeholder = "",
  className = "",
}) {
  // Check if label is required (contains a star)
  const isRequired = labelName.includes("*");

  // Remove the asterisk from the label text
  const labelText = labelName.replace("*", "").trim();

  return (
    <div className="input-box">
      <label htmlFor={labelName.replace(" ", "-").toLowerCase()}>
        {labelText}
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        className={className}
        id={labelName.replace(" ", "-").toLowerCase()}
        type={type}
        placeholder={placeholder}
        name={name}
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
};
