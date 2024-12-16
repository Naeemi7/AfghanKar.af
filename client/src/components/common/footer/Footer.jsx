import "@styles/components/footer.scss";
import Logo from "@reusable/Logo";
import QuickLinks from "./QuickLinks";
import Newsletter from "./Newsletter";
import FooterBottom from "./FooterBottom";
import SocialMediaLinks from "./SocialMeidaLinks";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* Reusable Logo Component */}
        <Logo height={15} width={15} />

        {/* QuickLink Component */}
        <QuickLinks />

        {/* SocialMediaLinks Component */}
        <SocialMediaLinks />

        {/* Newsletter Component */}
        <Newsletter />
      </div>

      {/* FooterBottom Component*/}
      <FooterBottom />
    </footer>
  );
};

export default Footer;
