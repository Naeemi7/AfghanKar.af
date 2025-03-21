import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const goTo = (path, state = {}) => {
    navigate(path, { state });
  };

  const goBack = () => {
    navigate(-1); // Adjusted to go back one step only
  };

  const goForward = () => {
    navigate(1);
  };

  return {
    goTo,
    goBack,
    goForward,
  };
}
