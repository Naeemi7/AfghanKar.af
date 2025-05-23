import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "@reusable/Icon";
const StyledButton = styled.button`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) =>
    props.$icon ? "8px" : "0"}; /* Space between text and icon */
`;

export default function Button({
  name = "button",
  className = "reusable-button",
  width,
  onClick,
  type = "",
  iconLibrary,
  iconName,
  iconSize = 24,
}) {
  return (
    <StyledButton
      className={className}
      width={width}
      onClick={onClick}
      type={type}
      $icon={iconLibrary && iconName}
    >
      {name}
      {iconLibrary && iconName && (
        <Icon library={iconLibrary} name={iconName} size={iconSize} />
      )}
    </StyledButton>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func,
  type: PropTypes.string,
  iconLibrary: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
};
