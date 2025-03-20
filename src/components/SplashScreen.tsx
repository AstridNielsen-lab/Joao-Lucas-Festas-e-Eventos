import React, { useEffect, useState } from 'react';

const MartiniIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    className="h-24 w-24 text-white mx-auto mb-6 animate-pulse"
  >
    <path 
      fill="currentColor" 
      d="M12 20v-7L20 4H4l8 9v7m-3 1h6" 
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle 
      cx="12" 
      cy="7" 
      r="2" 
      fill="#ef4444" 
    />
  </svg>
);

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
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#000000' }}
    >
      <div className="text-center">
        <MartiniIcon />
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          João Lucas Festas e Eventos
        </h1>
        <p className="text-xl text-gray-400">
          Transformando momentos em memórias inesquecíveis
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;