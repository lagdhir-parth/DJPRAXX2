import React from "react";
import { motion } from "framer-motion";
import { useScene } from "../../context/SceneContext";

const slowReveal = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const MainStageRevealUI: React.FC = () => {
  const { handleSelectScene } = useScene();

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none">
      {/* Bottom vignette — stage fills center, text uses lower darkness */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
      {/* Side vignettes — keep stage center open */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-black/60 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-black/40 to-transparent" />

      {/* Massive editorial title — uses left dark corridor */}
      <div className="absolute inset-y-0 left-0 flex flex-col justify-end pb-20 pl-6 sm:pl-10 lg:pl-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ ...slowReveal, delay: 0.25 }}
          >
            <p className="font-['Space_Grotesk'] text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-primary mb-3">
              DJ PRAXX
            </p>
          </motion.div>

          <motion.h1
            className="font-['Syne'] font-black uppercase text-white leading-none drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...slowReveal, delay: 0.35 }}
          >
            <span className="block text-[clamp(2.75rem,13vw,8.5rem)] tracking-tighter">
              MAIN
            </span>
            <span className="block text-[clamp(2.75rem,13vw,8.5rem)] tracking-tighter text-primary">
              STAGE
            </span>
          </motion.h1>

          <motion.div
            className="mt-6 sm:mt-8 w-12 sm:w-16 h-px bg-primary/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </div>

      {/* Advance interaction — bottom right, away from title */}
      <motion.button
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 right-6 sm:right-10 lg:right-16 flex items-center min-h-[44px] font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/60 hover:text-primary transition-colors duration-200 border-b border-white/20 hover:border-primary/50 pb-1 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        onClick={() => handleSelectScene("07_dj_booth")}
        aria-label="Advance to DJ booth"
      >
        Enter the booth
      </motion.button>
    </div>
  );
};

export default MainStageRevealUI;
