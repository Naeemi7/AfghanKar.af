import { useState } from "react";

export default function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    togglePasswordVisibility,
  };
}
