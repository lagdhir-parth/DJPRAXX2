import React, { useEffect, useState } from "react";
import { HowlerEngine } from "../../audio/howlerEngine";
import { Volume2, VolumeX } from "lucide-react";

export const AudioHUD: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const st = HowlerEngine.getState();

      setIsMuted(st.isMuted);
    };

    updateState();
    const unsubscribe = HowlerEngine.subscribe(updateState);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleMute = () => {
    HowlerEngine.toggleMute();
  };

  return (
    <aside
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6 z-30 pointer-events-auto"
      aria-label="Audio Playback Controller"
    >
      {/* Mute / Unmute */}
      <button
        onClick={handleToggleMute}
        className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-xl bg-black/80 border border-white/20 hover:border-amber-500/50 hover:bg-black/90 text-zinc-400 hover:text-white backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="size-5 text-red-400" />
        ) : (
          <Volume2 className="size-5 text-amber-400" />
        )}
      </button>
    </aside>
  );
};
