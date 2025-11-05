import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Sun, Moon, Menu, X, Puzzle, Users, Book, Heart } from "lucide-react";

import HomePage from "./pages/HomePage";
import ForumPage from "./pages/ForumPage";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-[#2C3333] text-white" : "bg-[#F5F5F5] text-gray-800"
        } transition-colors duration-300`}
      >
        <header
          className={`${
            isDarkMode
              ? "bg-gradient-to-r from-[#2C3333] to-[#395B64]"
              : "bg-gradient-to-r from-[#8ECAE6] to-[#A8DADC]"
          } shadow-md transition-colors duration-300`}
        >
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  className="md:hidden p-2 rounded-full hover:bg-white/20"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center space-x-2">
                  <Puzzle className="w-8 h-8 text-blue-600" />
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                    Tea-Web
                  </h1>
                </div>
              </div>

              <div className="hidden md:flex space-x-8">
                <NavLink
                  href="/"
                  icon={<Heart size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Início
                </NavLink>
                <NavLink
                  href="/sobre"
                  icon={<Book size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Sobre Autismo
                </NavLink>
                <NavLink
                  href="/forum"
                  icon={<Users size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Fórum
                </NavLink>
                <NavLink
                  href="/jogos"
                  icon={<Puzzle size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Jogos
                </NavLink>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="bg-[#90EE90] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#98FB98] transition-all transform hover:scale-105">
                  Entrar
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 space-y-4 animate-fadeIn">
                <MobileNavLink
                  href="/"
                  icon={<Heart size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Início
                </MobileNavLink>
                <MobileNavLink
                  href="/sobre"
                  icon={<Book size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Sobre Autismo
                </MobileNavLink>
                <MobileNavLink
                  href="/forum"
                  icon={<Users size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Fórum
                </MobileNavLink>
                <MobileNavLink
                  href="/jogos"
                  icon={<Puzzle size={18} />}
                  isDarkMode={isDarkMode}
                >
                  Jogos
                </MobileNavLink>
              </div>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route
              path="/sobre"
              element={<HomePage isDarkMode={isDarkMode} />} // TODO: Criar SobrePage
            />
            <Route
              path="/jogos"
              element={<HomePage isDarkMode={isDarkMode} />} // TODO: Criar JogosPage
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

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

export default App;
