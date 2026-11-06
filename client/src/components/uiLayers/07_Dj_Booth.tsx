import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useScene } from "../../context/SceneContext";
import { HowlerEngine, TRACKS } from "../../audio/howlerEngine";

const cinematic = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const DjBoothUI: React.FC = () => {
  const { handleSelectScene } = useScene();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);

  useEffect(() => {
    const sync = () => {
      const state = HowlerEngine.getState();
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setCurrentTrackIndex(state.currentTrackIndex);
      setPlaybackTime(state.playbackTime);
    };
    sync();
    return HowlerEngine.subscribe(sync);
  }, []);

  const currentTrack = TRACKS[currentTrackIndex] ?? TRACKS[0];

  const progress = currentTrack?.duration
    ? Math.min(100, (playbackTime / currentTrack.duration) * 100)
    : 0;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none">
      {/* Left column vignette for enhanced text legibility */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 lg:w-2/5 bg-linear-to-r from-black/85 via-black/45 to-transparent" />
      {/* Bottom anchor */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

      {/* Scene label */}
      <motion.p
        className="absolute top-20 sm:top-24 left-6 sm:left-10 lg:left-16 font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-primary/80"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...cinematic, delay: 0.15 }}
      >
        The Performance Booth
      </motion.p>

      {/* Editorial left panel */}
      <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-6 sm:pl-10 lg:pl-16 pr-6 max-w-[calc(100vw-2rem)] sm:max-w-sm lg:max-w-md pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...cinematic, delay: 0.25 }}
        >
          <h1 className="font-['Syne'] text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-white mb-2 drop-shadow-md">
            Behind<br />the <span className="text-primary">Decks</span>
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-white/70 leading-relaxed max-w-[260px]">
            Where craft becomes live performance.
          </p>
        </motion.div>

        {/* Audio control deck */}
        <motion.div
          className="pointer-events-auto mt-5 sm:mt-8 p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md w-full max-w-xs"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cinematic, delay: 0.4 }}
        >
          {/* Track name */}
          <div className="flex items-center justify-between mb-1">
            <p className="font-['Space_Grotesk'] text-[11px] font-semibold tracking-[0.2em] uppercase text-primary truncate max-w-[180px]">
              {currentTrack.title}
            </p>
            <span className="font-['Space_Grotesk'] text-[9px] text-white/40 uppercase tracking-widest">
              {currentTrack.bpm} BPM
            </span>
          </div>
          <p className="font-['Inter'] text-[11px] text-white/50 mb-3 truncate">
            {currentTrack.genre}
          </p>

          {/* Thin progress bar */}
          <div className="w-full h-1.5 rounded-full bg-white/10 mb-3.5 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play / Mute Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => HowlerEngine.togglePlay()}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-primary text-black hover:bg-orange-400 transition-colors duration-200 cursor-pointer shadow-lg shadow-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => HowlerEngine.toggleMute()}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-orange-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <span className="text-[10px] font-['Space_Grotesk'] text-white/40 uppercase tracking-wider ml-auto">
              {isPlaying ? "Live Audio" : "Paused"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scene advance — bottom right */}
      <motion.button
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 right-6 sm:right-10 lg:right-16 flex items-center min-h-[44px] font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/60 hover:text-primary transition-colors duration-200 border-b border-white/20 hover:border-primary/50 pb-1 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={() => handleSelectScene("08_praxx_radio")}
        aria-label="Continue to Praxx Radio"
      >
        Explore the music
      </motion.button>

      {/* Thin orange vertical accent */}
      <motion.div
        className="absolute left-0 top-1/3 bottom-1/3 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ ...cinematic, delay: 0.3 }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
};

export default DjBoothUI;
