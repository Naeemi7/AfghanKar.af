import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function Textarea({
  labelName,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="text-area-container">
      <label htmlFor={name}>{labelName}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}

Textarea.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
