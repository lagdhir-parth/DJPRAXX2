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
      className="fixed bottom-6 right-6 z-30 pointer-events-auto"
      aria-label="Audio Playback Controller"
    >
      {/* Mute / Unmute */}
      <button
        onClick={handleToggleMute}
        className="p-3 rounded-xl bg-black/75 border border-white/20  hover:bg-white/10 text-zinc-400 hover:text-white transition-all active:scale-95"
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="size-5 text-red-400" />
        ) : (
          <Volume2 className="size-5" />
        )}
      </button>
      {/* </div> */}
    </aside>
  );
};
