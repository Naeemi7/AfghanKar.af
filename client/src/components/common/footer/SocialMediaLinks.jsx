import SocialMedia from "@reusable/SocialMedia";

export default function SocialMediaLinks() {
  return (
    <div className="footer-section">
      <h3>Connect with Us</h3>

      {/* SocialMedia Reusable Component */}
      <SocialMedia size={28} color="#a0c1c7" />
    </div>
  );
}
