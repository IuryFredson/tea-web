import React from "react";
import { Link } from "react-router-dom";

const MobileNavLink = ({ href, children, icon, isDarkMode }) => (
  <Link
    to={href}
    className={`flex items-center space-x-2 ${
      isDarkMode
        ? "text-white hover:text-blue-400"
        : "text-black hover:text-blue-600"
    } transition-colors p-2 rounded-lg`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default MobileNavLink;
