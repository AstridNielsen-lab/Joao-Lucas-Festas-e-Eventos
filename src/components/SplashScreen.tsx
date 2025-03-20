import React, { useEffect, useState } from 'react';
import { GlassWater } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-purple-600 flex items-center justify-center z-50 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <GlassWater className="h-24 w-24 text-white mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          João Lucas Festas e Eventos
        </h1>
        <p className="text-xl text-white opacity-90">
          Transformando momentos em memórias inesquecíveis
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;