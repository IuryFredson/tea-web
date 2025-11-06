import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ href, children, icon, isDarkMode }) => (
  <Link
    to={href}
    className={`flex items-center space-x-2 ${
      isDarkMode
        ? "text-white hover:text-blue-400"
        : "text-black hover:text-blue-600"
    } transition-colors`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default NavLink;
