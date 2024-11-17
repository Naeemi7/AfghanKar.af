export default function QuickLinks() {
  const links = [
    { href: "/jobs", name: "Find Jobs" },
    { href: "/recruiters", name: "For Recruiters" },
    { href: "/contact", name: "Contact Us" },
  ];

  return (
    <div className="footer-section quick-links">
      <h3>Quick Links</h3>
      <ul>
        {links.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
