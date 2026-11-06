import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useScene } from "../../context/SceneContext";

const cinematic = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const EntranceTunnelUI: React.FC = () => {
  const { handleSelectScene } = useScene();

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none">
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />

      {/* Heading — anchored in tunnel shadow, bottom-left */}
      <motion.div
        className="absolute bottom-24 sm:bottom-28 left-6 sm:left-10 lg:left-16 max-w-xs sm:max-w-md pr-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...cinematic, delay: 0.2 }}
      >
        <p className="font-['Space_Grotesk'] text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/50 mb-2 sm:mb-3">
          Music · People · Moments
        </p>
        <h1 className="font-['Syne'] text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight text-white drop-shadow-md">
          The Night
          <br />
          <span className="text-primary">Starts</span> Here
        </h1>
      </motion.div>

      {/* Continue interaction */}
      <motion.button
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 left-6 sm:left-10 lg:left-16 flex items-center gap-2.5 font-['Space_Grotesk'] text-[11px] tracking-[0.28em] uppercase text-white/70 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] py-2 px-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...cinematic, delay: 0.4 }}
        onClick={() => handleSelectScene("05_audience")}
        aria-label="Continue to audience"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-primary" />
        </motion.span>
        <span>Follow the sound</span>
      </motion.button>

      {/* Thin orange accent line on left edge */}
      <motion.div
        className="absolute left-0 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-primary/60 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ ...cinematic, delay: 0.3 }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
};

export default EntranceTunnelUI;
