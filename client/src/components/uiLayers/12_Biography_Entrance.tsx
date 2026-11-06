import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScene } from "../../context/SceneContext";

const cinematic = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const BiographyEntranceUI: React.FC = () => {
  const { handleSelectScene } = useScene();

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none">
      {/* Right-side and bottom vignette to frame the portrait and make text pop */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 bg-linear-to-l from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />

      {/* Right-aligned column — personality, intimate editorial tone */}
      <div className="absolute inset-y-0 right-0 flex flex-col justify-end pb-20 sm:pb-24 pr-4 sm:pr-10 lg:pr-16 items-end text-right max-w-sm sm:max-w-md ml-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cinematic, delay: 0.2 }}
        >
          <p className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-primary mb-2 sm:mb-3">
            Behind the Sound
          </p>
          <h1 className="font-['Syne'] text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-lg">
            Beyond
            <br />
            the <span className="text-primary">Booth</span>
          </h1>
          <motion.p
            className="mt-3 sm:mt-5 font-['Inter'] text-xs sm:text-base text-white/70 leading-relaxed max-w-[280px] ml-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A story of craft, culture, and the relentless pursuit of sound.
          </motion.p>
        </motion.div>
      </div>

      {/* Continue button — bottom right */}
      <motion.button
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 right-4 sm:right-10 lg:right-16 flex items-center gap-2 font-['Space_Grotesk'] text-[11px] tracking-[0.28em] uppercase text-white/70 hover:text-primary transition-colors duration-200 group cursor-pointer min-h-[44px] py-2 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        onClick={() => handleSelectScene("13_biography_chapter")}
        aria-label="Read the biography"
      >
        <span>Read the story</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </motion.button>

      {/* Thin orange top accent rule */}
      <motion.div
        className="absolute top-0 left-1/3 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
};

export default BiographyEntranceUI;
