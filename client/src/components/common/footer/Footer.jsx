import "@styles/components/footer.scss";
import Icon from "@reusable/Icon";
import logo from "@images/navbar/logo3.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* Logo */}
        <div className="footer-section logo">
          <img src={logo} alt="logo image" />
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/jobs">Find Jobs</a>
            </li>
            <li>
              <a href="/recruiters">For Recruiters</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <Icon library="md" name="MdFacebook" size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <Icon library="md" name="MdTwitter" size={24} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <Icon library="md" name="MdLinkedIn" size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Your Email" aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} AfghanKar.af. All Rights Reserved.
        </p>
        <div className="legal-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>|</span>
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
