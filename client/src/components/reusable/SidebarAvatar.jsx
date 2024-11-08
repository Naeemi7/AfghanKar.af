import PropTypes from "prop-types";

export default function SidebarAvatar({
  avatarImage,
  avatarHeading,
  avatarParagraph,
}) {
  return (
    <header className="avatar">
      <img src={avatarImage} alt="Profile Avatar" />
      <h4>{avatarHeading}</h4>
      <p>{avatarParagraph}</p>
    </header>
  );
}

SidebarAvatar.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  avatarHeading: PropTypes.string.isRequired,
  avatarParagraph: PropTypes.string.isRequired,
};
