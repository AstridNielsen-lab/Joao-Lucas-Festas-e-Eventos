import React from 'react';
import { Award, Users, Calendar, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Nossa História"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Nossa História
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Transformando momentos em memórias desde 2015
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Uma Jornada de Excelência
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Desde nossa fundação em 2015, a João Lucas Festas e Eventos tem se dedicado a criar experiências únicas e memoráveis para nossos clientes. Nossa jornada começou com um sonho de transformar eventos comuns em momentos extraordinários.
              </p>
              <p>
                Com anos de experiência no mercado de eventos, desenvolvemos um profundo conhecimento das necessidades e desejos dos nossos clientes, sempre buscando superar expectativas e criar momentos inesquecíveis.
              </p>
              <p>
                Nossa equipe altamente qualificada trabalha com paixão e dedicação para garantir que cada detalhe seja perfeito, desde a escolha dos drinks até a coordenação completa do evento.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Qualidade</h3>
              <p className="text-gray-400">Excelência em cada detalhe</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Equipe</h3>
              <p className="text-gray-400">Profissionais dedicados</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Experiência</h3>
              <p className="text-gray-400">Anos no mercado</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Paixão</h3>
              <p className="text-gray-400">Amor pelo que fazemos</p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nossa Missão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Visão</h3>
              <p className="text-gray-300">
                Ser referência em qualidade e inovação no mercado de eventos, criando experiências únicas e memoráveis.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Missão</h3>
              <p className="text-gray-300">
                Proporcionar momentos inesquecíveis através de serviços de excelência e atendimento personalizado.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Valores</h3>
              <p className="text-gray-300">
                Comprometimento, qualidade, inovação, ética e paixão pelo que fazemos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;