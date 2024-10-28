import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";
import Icon from "@reusable/Icon";
import Button from "@reusable/Button";

export default function SelectionCard({
  select,
  handleSelection,
  iconLib,
  iconName,
  heading,
  content,
  handleNext,
}) {
  return (
    <div className="selection-card-container">
      <div
        className={`buttons-container ${select ? "selected" : ""}`} // Apply selected class
        onClick={handleSelection} // Handle click to select this card
      >
        <div className="buttons-wrapper">
          <div className="input-wrapper">
            <input
              type="checkbox"
              checked={select} // Sync checkbox with state
              readOnly // Make checkbox read-only since we handle selection with the card
            />
          </div>
          <div className="icon-container">
            <div className="icon-wrapper">
              <Icon
                library={iconLib}
                name={iconName}
                size={26}
                className="icon"
              />
            </div>
            <h4>{heading}</h4>
            <p>{content}</p>
          </div>
        </div>
      </div>

      {/* Reusable Button Component */}
      {select && <Button name="Next" onClick={handleNext} />}
    </div>
  );
}

SelectionCard.propTypes = {
  select: PropTypes.bool.isRequired, // Ensure this is a boolean
  handleSelection: PropTypes.func,
  iconName: PropTypes.string,
  iconLib: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.string,
  handleNext: PropTypes.func,
};
