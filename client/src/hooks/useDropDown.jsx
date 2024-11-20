import { useState, useRef, useEffect } from "react";

export function useDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const profileRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowDropdown(true), 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowDropdown((prev) => !prev);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    showDropdown,
    profileRef,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
  };
}
