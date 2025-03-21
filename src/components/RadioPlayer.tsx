import React, { useState, useEffect } from 'react';
import { Radio, Volume2, VolumeX, Music, Volume1, Volume } from 'lucide-react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [audio] = useState(new Audio('https://servidor40.brlogic.com:8044/live'));

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.3) return <Volume className="h-5 w-5" />;
    if (volume < 0.7) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div 
      className={`fixed bottom-4 left-4 bg-black/90 text-white rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-72' : 'w-auto'
      }`}
    >
      <div 
        className="flex items-center p-4 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          <Radio className={`h-6 w-6 ${isPlaying ? 'animate-pulse' : ''}`} />
          <Music className="h-6 w-6" />
        </button>
        
        {isExpanded && (
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Rádio Tatuapé FM</p>
              {isPlaying && (
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                  Ao vivo
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setVolume(v => (v === 0 ? 0.5 : 0));
                }}
                className="hover:opacity-80"
              >
                <VolumeIcon />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onClick={e => e.stopPropagation()}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioPlayer;
