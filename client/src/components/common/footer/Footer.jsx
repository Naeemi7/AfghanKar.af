import "@styles/components/footer.scss";
import Logo from "@reusable/Logo";
import QuickLinks from "./QuickLinks";
import SocialMedia from "./SocialMedia";
import Newsletter from "./Newsletter";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* Reusable Logo Component */}
        <Logo height={15} width={15} />

        {/* QuickLink Component */}
        <QuickLinks />

        {/* SocialMedia Component */}
        <SocialMedia />

        {/* Newsletter Component */}
        <Newsletter />
      </div>

      {/* FooterBottom Component*/}
      <FooterBottom />
    </footer>
  );
};

export default Footer;
