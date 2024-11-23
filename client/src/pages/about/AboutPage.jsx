import "@styles/pages/pages-style.scss";
import Button from "@reusable/Button";

export default function About() {
  return (
    <div className="about-container">
      <section className="intro">
        <h1>Welcome to AfghanKar.af!</h1>
        <p>
          AfghanKar.af is a dynamic platform designed to connect job seekers
          with recruiters, offering an efficient and seamless experience for
          both sides of the hiring process. Our mission is to empower job
          seekers and help companies find the best talent in Afghanistan.
        </p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          We are committed to creating meaningful connections between talented
          job seekers and forward-thinking companies. Our goal is to streamline
          the hiring process, making it easier for employers to find the right
          candidates, and for individuals to access the opportunities they
          deserve.
        </p>
      </section>

      <section className="job-seekers">
        <h2>For Job Seekers</h2>
        <ul>
          <li>Search for Jobs</li>
          <li>Create a Profile</li>
          <li>Apply for Jobs</li>
          <li>Receive Alerts</li>
          <li>Improve Visibility</li>
          <li>Career Resources</li>
        </ul>
      </section>

      <section className="recruiters">
        <h2>For Recruiters</h2>
        <ul>
          <li>Post Job Openings</li>
          <li>Search Resumes</li>
          <li>Streamlined Hiring</li>
          <li>Get Notified</li>
          <li>Company Branding</li>
        </ul>
      </section>

      <section className="why-us">
        <h2>Why Choose AfghanKar.af?</h2>
        <ul>
          <li>User-Friendly</li>
          <li>Wide Reach</li>
          <li>Diverse Industries</li>
          <li>Secure Platform</li>
          <li>Support for All</li>
        </ul>
      </section>

      <section className="how-it-works">
        <h2>How AfghanKar.af Works</h2>
        <ol>
          <li>Sign Up</li>
          <li>Create Your Profile</li>
          <li>Browse & Apply</li>
          <li>Connect</li>
          <li>Grow</li>
        </ol>
      </section>

      <section className="contact">
        <h2>Get in Touch</h2>
        <p>
          If you have any questions or need assistance, don’t hesitate to reach
          out.
        </p>
        <Button
          name="Contact Us"
          onClick={() => (window.location = "mailto:support@afghankar.af")}
        />
      </section>

      <section className="cta">
        <h2>Join Us Today</h2>
        <p>
          Whether you're looking for your next career opportunity or seeking
          talented individuals to join your team, AfghanKar.af is here to help
          you succeed. Start today and take the next step in your professional
          journey!
        </p>
        <Button name="Sign Up" onClick={() => (window.location = "/signup")} />
      </section>
    </div>
  );
}
