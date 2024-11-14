import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";

export default function Select({
  labelName,
  name,
  options,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="select-container">
      <label htmlFor={name}>{labelName}</label>
      <select
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
