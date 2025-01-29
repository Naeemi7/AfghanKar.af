import { useCallback } from "react";

const useFormattedName = () => {
  const formatName = useCallback((fullName) => {
    if (!fullName) return { firstName: "", lastName: "" };

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] ? capitalize(nameParts[0]) : "";
    const lastName = nameParts.slice(1).join(" ")
      ? capitalize(nameParts.slice(1).join(" "))
      : "";

    return { firstName, lastName };
  }, []);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return { formatName };
};

export default useFormattedName;
