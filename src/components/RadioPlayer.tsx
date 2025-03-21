import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';

const STREAM_URL = "http://88.150.230.110/stream.mp3?ipport=88.150.230.110_30984";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [currentSong, setCurrentSong] = useState('Radio Ao Vivo');
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.crossOrigin = "anonymous";
      
      const handleWaiting = () => setIsBuffering(true);
      const handlePlaying = () => {
        setIsBuffering(false);
        setIsPlaying(true);
      };
      const handleError = (e: Event) => {
        console.error('Audio stream error:', e);
        setIsPlaying(false);
        setIsBuffering(false);
        // Attempt to reconnect after error
        if (audioRef.current) {
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.load();
            }
          }, 2000);
        }
      };

      audioRef.current.addEventListener('waiting', handleWaiting);
      audioRef.current.addEventListener('playing', handlePlaying);
      audioRef.current.addEventListener('error', handleError);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('waiting', handleWaiting);
          audioRef.current.removeEventListener('playing', handlePlaying);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause();
          setIsPlaying(false);
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowVolume(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsBuffering(true);
        audioRef.current.src = STREAM_URL;
        audioRef.current.type = 'audio/mpeg';
        await audioRef.current.load();
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing media:', error);
      setIsPlaying(false);
      setIsBuffering(false);
    }
  };

  const toggleVolume = () => {
    setShowVolume(!showVolume);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-4 left-4 bg-black/90 backdrop-blur-sm text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-black/95 p-4"
    >
      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
      >
        <source src={STREAM_URL} type="audio/mpeg" />
      </audio>

      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="relative overflow-hidden">
            <div className={`whitespace-nowrap ${isPlaying ? 'animate-marquee' : ''}`}>
              {currentSong}
            </div>
          </div>
          {isPlaying && (
            <div className={`text-xs text-gray-400 ${isBuffering ? 'animate-pulse' : ''}`}>
              {isBuffering ? 'Carregando...' : 'Ao vivo'}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleVolume}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              title="Volume"
            >
              {volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>

            {showVolume && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black/90 rounded-lg shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgb(80, 138, 165) 0%, rgb(80, 138, 165) ${volume * 100}%, rgb(255, 255, 255) ${volume * 100}%, rgb(255, 255, 255) 100%)`
                  }}
                />
              </div>
            )}
          </div>

          <button
            onClick={toggleLike}
            className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-400'
            }`}
            title={isLiked ? 'Descurtir' : 'Curtir'}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;