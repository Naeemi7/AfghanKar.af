import "@styles/pages/not-found.scss";
import Button from "@reusable/Button";
import useNavigation from "@hooks/useNavigation";
import useUserContext from "@hooks/useUserContext";
import notFoundImage from "@images/not-found-page/not-found.png";

const NotFoundPage = () => {
  const { goTo } = useNavigation();
  const { isLoggedIn } = useUserContext();

  return (
    <div className="not-found-page-container">
      <div className="not-found-content">
        <h1>404</h1>
        <span></span>
        <p>Sorry, the page you are looking for could not be found</p>
        <Button
          name="Go to Main"
          width={120}
          onClick={() => {
            isLoggedIn ? goTo("/home") : goTo("/");
          }}
        />
      </div>
      <div className="not-found-image">
        <img src={notFoundImage} alt="Not Found image" />
      </div>
    </div>
  );
};

export default NotFoundPage;
