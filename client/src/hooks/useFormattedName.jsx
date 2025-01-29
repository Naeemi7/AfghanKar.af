import { useCallback } from "react";

export default function useFormattedName() {
  const capitalize = useCallback(
    (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    []
  );

  const formatName = useCallback(
    (fullName) => {
      if (!fullName || typeof fullName !== "string")
        return { fullName: "", firstName: "", lastName: "" };

      const nameParts = fullName.trim().split(/\s+/); // Handles multiple spaces
      const firstName = nameParts[0] ? capitalize(nameParts[0]) : "";
      const lastName = nameParts.slice(1).join(" ")
        ? capitalize(nameParts.slice(1).join(" "))
        : "";

      return {
        fullName: `${firstName} ${lastName}`.trim(),
        firstName,
        lastName,
      };
    },
    [capitalize]
  );

  return { formatName };
}
