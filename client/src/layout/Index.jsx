import PropTypes from "prop-types";
import Navbar from "@common/navbar/Navbar";
import Footer from "@common/footer/Footer";
import "@styles/layouts/main-layout.scss";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout-content">{children}</main>
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
