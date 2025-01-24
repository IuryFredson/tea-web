import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Puzzle, Users, Book, Heart } from 'lucide-react';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Paleta de cores suaves e calmantes, preferidas por muitas pessoas autistas
  const colors = {
    primary: 'rgb(142, 202, 230)', // Azul suave
    secondary: 'rgb(173, 216, 230)', // Azul claro
    accent: 'rgb(144, 238, 144)', // Verde suave
    background: 'rgb(245, 245, 245)', // Cinza muito claro
    darkBackground: 'rgb(44, 51, 51)', // Cinza escuro suave
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#2C3333] text-white' : 'bg-[#F5F5F5] text-gray-800'} transition-colors duration-300`}>
      {/* Header com gradiente suave */}
      <header className={`${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#2C3333] to-[#395B64]' 
          : 'bg-gradient-to-r from-[#8ECAE6] to-[#A8DADC]'
      } shadow-md transition-colors duration-300`}>
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
            <NavLink href="#inicio" icon={<Heart size={18} />} isDarkMode={isDarkMode}>Início</NavLink>
            <NavLink href="#sobre" icon={<Book size={18} />} isDarkMode={isDarkMode}>Sobre Autismo</NavLink>
             <NavLink href="#forum" icon={<Users size={18} />} isDarkMode={isDarkMode}>Fórum</NavLink>
            <NavLink href="#jogos" icon={<Puzzle size={18} />} isDarkMode={isDarkMode}>Jogos</NavLink>
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

          {/* Menu Mobile com animação suave */}
          {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 animate-fadeIn">
          <MobileNavLink href="#inicio" icon={<Heart size={18} />} isDarkMode={isDarkMode}>Início</MobileNavLink>
          <MobileNavLink href="#sobre" icon={<Book size={18} />} isDarkMode={isDarkMode}>Sobre Autismo</MobileNavLink>
          <MobileNavLink href="#forum" icon={<Users size={18} />} isDarkMode={isDarkMode}>Fórum</MobileNavLink>
          <MobileNavLink href="#jogos" icon={<Puzzle size={18} />} isDarkMode={isDarkMode}>Jogos</MobileNavLink>
        </div>
      )}
        </nav>
      </header>

      {/* Hero Section com formas orgânicas */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8ECAE6] rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#90EE90] rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
              Bem-vindo ao Tea-Web
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              Um espaço acolhedor dedicado à comunidade autista, 
              onde compartilhamos conhecimento, experiências e apoio mútuo.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-[#8ECAE6] text-gray-800 px-6 py-3 rounded-lg hover:bg-[#A8DADC] transition-all transform hover:scale-105">
                Explorar Recursos
              </button>
              <button className={`border-2 border-[#8ECAE6] ${
                isDarkMode ? 'text-white' : 'text-black'
              } px-6 py-3 rounded-lg hover:bg-[#8ECAE6]/10 transition-all`}>
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid com cards suaves */}
      <section className={`py-16 ${isDarkMode ? 'bg-[#395B64]' : 'bg-white/80'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-500" />}
              title="Fórum de Discussão"
              description="Um espaço seguro para compartilhar experiências e conhecimento com outros membros da comunidade."
              isDark={isDarkMode}
            />
            <FeatureCard
              icon={<Puzzle className="w-8 h-8 text-green-500" />}
              title="Jogos Educativos"
              description="Atividades interativas desenvolvidas especialmente para crianças autistas, respeitando seu próprio ritmo."
              isDark={isDarkMode}
            />
            <FeatureCard
              icon={<Book className="w-8 h-8 text-purple-500" />}
              title="Recursos e Informações"
              description="Conteúdo atualizado e cientificamente embasado sobre autismo, com foco no desenvolvimento e bem-estar."
              isDark={isDarkMode}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const NavLink = ({ href, children, icon, isDarkMode }) => (
  <a
    href={href}
    className={`flex items-center space-x-2 ${
      isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'
    } transition-colors`}
  >
    {icon}
    <span>{children}</span>
  </a>
);

const MobileNavLink = ({ href, children, icon, isDarkMode }) => (
  <a
    href={href}
    className={`flex items-center space-x-2 ${
      isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'
    } transition-colors p-2 rounded-lg`}
  >
    {icon}
    <span>{children}</span>
  </a>
);

const FeatureCard = ({ icon, title, description, isDark }) => (
  <div className={`p-6 rounded-xl ${
    isDark 
      ? 'bg-[#2C3333] hover:bg-[#2C3333]/80' 
      : 'bg-white hover:bg-gray-50'
  } shadow-lg transition-all transform hover:scale-105 hover:shadow-xl`}>
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  </div>
);

export default App;