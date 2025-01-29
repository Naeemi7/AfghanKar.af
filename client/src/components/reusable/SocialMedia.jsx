import PropTypes from "prop-types";
import "@styles/components/reusableComponents.scss";
import socialLinks from "@data/reusable/socialLinks";
import Icon from "@reusable/Icon";

export default function SocialMedia({ size = 24, color }) {
  return (
    <div className="social-media-container">
      {socialLinks.map(({ href, icon }, index) => (
        <a
          style={{ color: color }}
          key={index}
          href={href}
          aria-label={icon[0].name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon.map(({ library, name }) => (
            <Icon key={name} library={library} name={name} size={size} />
          ))}
        </a>
      ))}
    </div>
  );
}

SocialMedia.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
