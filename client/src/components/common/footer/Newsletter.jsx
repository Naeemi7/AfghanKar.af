export default function Newsletter() {
  return (
    <div className="footer-section newsletter">
      <h3>Stay Updated</h3>
      <form className="newsletter-form">
        <input type="email" placeholder="Your Email" aria-label="Email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
