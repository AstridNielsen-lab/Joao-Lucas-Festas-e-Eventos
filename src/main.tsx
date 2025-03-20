import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import './index.css';

function Root() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <StrictMode>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <App />
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);