import PropTypes from "prop-types";
import "@styles/reusableComponents.scss";

export default function ReusableInput({
  labelName,
  type = "text",
  name = "",
  placeholder = "",
  className = "",
}) {
  return (
    <div className="input-box">
      <label htmlFor={labelName.replace(" ", "-").toLowerCase()}>
        {labelName}
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

ReusableInput.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
