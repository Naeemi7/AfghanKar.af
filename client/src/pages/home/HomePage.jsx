import "@styles/pages/pages-style.scss";
import Jobs from "@features/jobs/Jobs";

export default function HomePage() {
  return (
    <div className="home-page-container">
      <Jobs />
      {/* <h1>Welcome to AfghanKar.af</h1>
      <p>Your getway to job opportunities in Afghanistan</p> */}
    </div>
  );
}
