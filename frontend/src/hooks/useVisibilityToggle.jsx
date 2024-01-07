import { useState, useRef, useEffect } from "react";

const useVisibilityToggle = (initialSidebarVisibility = true, initialDropdownVisibility = false) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(initialSidebarVisibility);
  const [isDropdownOpen, setIsDropdownOpen] = useState(initialDropdownVisibility);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  };
};

export default useVisibilityToggle;
