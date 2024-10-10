import Icon from "@reusable/Icon";
import socialLinks from "@data/footer/socialLinks";

export default function SocialMedia() {
  return (
    <div className="footer-section social-media">
      <h3>Connect with Us</h3>
      <div className="social-icons">
        {socialLinks.map((links, index) => (
          <a href={links.href} aria-label={links.icon[0].name} key={index}>
            {links.icon.map((item, iconIndex) => (
              <Icon
                key={iconIndex}
                library={item.library}
                name={item.name}
                size={item.size}
              />
            ))}
          </a>
        ))}
      </div>
    </div>
  );
}
