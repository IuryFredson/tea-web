import React from "react";
import { Users, Puzzle, Book } from "lucide-react";

const HomePage = ({ isDarkMode }) => {
  return (
    <>
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
              Um espaço acolhedor dedicado à comunidade autista, onde
              compartilhamos conhecimento, experiências e apoio mútuo.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-[#8ECAE6] text-gray-800 px-6 py-3 rounded-lg hover:bg-[#A8DADC] transition-all transform hover:scale-105">
                Explorar Recursos
              </button>
              <button
                className={`border-2 border-[#8ECAE6] ${
                  isDarkMode ? "text-white" : "text-black"
                } px-6 py-3 rounded-lg hover:bg-[#8ECAE6]/10 transition-all`}
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-16 ${isDarkMode ? "bg-[#395B64]" : "bg-white/80"}`}
      >
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
    </>
  );
};

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

export default HomePage;
