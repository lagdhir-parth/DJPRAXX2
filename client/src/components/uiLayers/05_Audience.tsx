import React from "react";
import { motion } from "framer-motion";
import { useScene } from "../../context/SceneContext";

const cinematic = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const AudienceUI: React.FC = () => {
  const { handleSelectScene } = useScene();

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none">
      {/* Deep bottom vignette — crowd fills frame, text needs anchor */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
      {/* Subtle top darkening */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/45 to-transparent" />

      {/* Atmospheric side wash */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-black/40 to-transparent" />

      {/* Main statement — left column, gives crowd/stage the center/right */}
      <motion.div
        className="absolute bottom-20 sm:bottom-24 left-6 sm:left-10 lg:left-16 max-w-[280px] sm:max-w-xs lg:max-w-sm pr-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...cinematic, delay: 0.2 }}
      >
        <h1 className="font-['Syne'] text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-md">
          One Room.
          <br />
          One <span className="text-primary">Frequency.</span>
        </h1>
        <motion.p
          className="mt-3 sm:mt-4 font-['Inter'] text-sm sm:text-base text-white/70 leading-relaxed max-w-[240px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The stage waits. The crowd is ready.
        </motion.p>
      </motion.div>

      {/* Forward nudge — minimal text interaction */}
      <motion.button
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 left-6 sm:left-10 lg:left-16 flex items-center min-h-[44px] font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/60 hover:text-primary transition-colors duration-200 border-b border-white/20 hover:border-primary/50 pb-1 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={() => handleSelectScene("06_main_stage_reveal")}
        aria-label="Advance to main stage"
      >
        See the stage
      </motion.button>

      {/* Subtle horizontal accent at bottom */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

export default AudienceUI;
