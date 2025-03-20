import React, { useState } from 'react';
import { Radio, Volume2, VolumeX } from 'lucide-react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://servidor40.brlogic.com:8044/live'));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 cursor-pointer group">
      <button
        onClick={togglePlay}
        className="flex items-center space-x-2"
        title="Rádio Tatuapé FM"
      >
        <Radio className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out">
          {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </span>
      </button>
    </div>
  );
};

export default RadioPlayer;