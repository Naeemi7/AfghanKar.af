import { Outlet } from "react-router-dom";
import "@styles/layouts/layouts.scss";
import Navbar from "@common/navbar/Navbar";
import Footer from "@common/footer/Footer";

export default function AppLayout() {
  return (
    <div className="app-grid">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
