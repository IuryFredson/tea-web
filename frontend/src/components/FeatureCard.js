import React from "react";

const FeatureCard = ({ icon, title, description, isDark }) => (
  <div
    className={`p-6 rounded-xl ${
      isDark
        ? "bg-[#2C3333] hover:bg-[#2C3333]/80"
        : "bg-white hover:bg-gray-50"
    } shadow-lg transition-all transform hover:scale-105 hover:shadow-xl`}
  >
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  </div>
);

export default FeatureCard;
