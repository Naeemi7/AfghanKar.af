export default function FooterBottom() {
  return (
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
  );
}
