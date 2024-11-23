import "@styles/pages/pages-style.scss";
import Button from "@reusable/Button";
import useNavigation from "@hooks/useNavigation";
import notFoundImage from "@images/not-found-page/not-found.png";

export default function NotFoundPage() {
  const { goTo } = useNavigation();

  return (
    <div className="not-found-page-container">
      <div className="not-found-wrapper">
        <div className="not-found-content">
          <h1>
            Afghan<span>kar.af</span>
          </h1>
          <span></span>
          <p>Sorry, the page you are looking for could not be found</p>
          <Button
            name="Go to Main"
            width={135}
            iconLibrary="ti"
            iconName="TiArrowBack"
            onClick={() => {
              goTo("/");
            }}
          />
        </div>
        <div className="not-found-image">
          <img src={notFoundImage} alt="Not Found image" />
        </div>
      </div>
    </div>
  );
}
