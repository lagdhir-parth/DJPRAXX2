import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScene } from "../../context/SceneContext";

const cinematic = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

/** Real biography content for DJ PRAXX — Parth Chavda */
const BIOGRAPHY_CHAPTERS = [
  {
    id: "first_frequency",
    number: "01",
    tagline: "The Origin",
    heading: "The First Frequency",
    body: "Born in Rajkot, Gujarat, Parth Chavda discovered rhythm before words. Growing up surrounded by the pulse of traditional Garba and the emerging electronic underground, he found that music was never just sound — it was architecture. Every beat was a room you could walk into.",
    detail: "The beginning of a life shaped by sound.",
  },
  {
    id: "craft",
    number: "02",
    tagline: "The Technique",
    heading: "Learning the Craft",
    body: "Self-taught on borrowed controllers and secondhand decks, PRAXX spent years studying the science of energy management — how a room's mood shifts from anticipation to euphoria to memory. Bollywood fusion became his native language: classical emotion layered over modern kinetics.",
    detail: "Where intuition became technique.",
  },
  {
    id: "rajkot_nights",
    number: "03",
    tagline: "The Stage",
    heading: "Rajkot Nights",
    body: "From wedding mandaps to resort arenas, PRAXX built a reputation for reading a crowd with unusual precision. Every venue became a new equation — the same musical instincts applied to a different human geometry. His sets became known for their seamless transitions and unexpected emotional peaks.",
    detail: "Stages from Kalawad Road to resort lakefronts.",
  },
];

const BiographyChapterUI: React.FC = () => {
  const { handleSelectScene } = useScene();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const activeChapter = BIOGRAPHY_CHAPTERS[activeChapterIndex];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain">
      {/* Background vignettes — text on left, vinyl visual preserved on right */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-linear-to-r from-black/90 via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent pointer-events-none" />

      {/* Main content container */}
      <div className="relative z-20 flex-1 flex flex-col justify-start sm:justify-center px-4 sm:px-10 lg:px-16 pt-20 sm:pt-32 pb-20 max-w-xl lg:max-w-2xl pointer-events-auto">
        {/* Section title */}
        <motion.p
          className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-primary font-semibold mb-3"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...cinematic, delay: 0.15 }}
        >
          The Story of PRAXX
        </motion.p>

        {/* Chapter selector tabs */}
        <motion.div
          className="pointer-events-auto flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cinematic, delay: 0.2 }}
        >
          {BIOGRAPHY_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapterIndex(idx)}
              className={`flex items-center gap-2 min-h-[44px] py-1.5 px-3.5 rounded-md border text-left transition-all duration-200 cursor-pointer ${
                activeChapterIndex === idx
                  ? "border-primary/50 bg-primary/10 text-white"
                  : "border-white/10 bg-black/20 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              <span className="font-['Space_Grotesk'] text-[11px] font-bold tabular-nums text-primary">
                {ch.number}
              </span>
              <span className="inline font-['Space_Grotesk'] text-[10px] tracking-wider uppercase">
                {ch.tagline}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Chapter Content with smooth cross-fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-3 drop-shadow-md">
              {activeChapter.heading}
            </h2>

            <div className="w-10 h-0.5 bg-primary/60 mb-4 sm:mb-5" />

            <p className="font-['Inter'] text-xs sm:text-base text-white/80 leading-relaxed mb-4">
              {activeChapter.body}
            </p>

            <p className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary/70">
              {activeChapter.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <motion.div
          className="pointer-events-auto flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {activeChapterIndex < BIOGRAPHY_CHAPTERS.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveChapterIndex(activeChapterIndex + 1)}
              className="flex items-center gap-2 min-h-[44px] font-['Space_Grotesk'] text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSelectScene("14_artist_profile")}
              className="flex items-center gap-2 min-h-[44px] font-['Space_Grotesk'] text-[11px] tracking-[0.25em] uppercase text-primary hover:text-orange-400 transition-colors duration-200 cursor-pointer border-b border-primary/40 pb-1"
            >
              <span>View Artist Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {activeChapterIndex < BIOGRAPHY_CHAPTERS.length - 1 && (
            <button
              type="button"
              onClick={() => handleSelectScene("14_artist_profile")}
              className="flex items-center min-h-[44px] font-['Space_Grotesk'] text-[10px] tracking-[0.25em] uppercase text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer ml-auto"
            >
              Skip to Profile →
            </button>
          )}
        </motion.div>
      </div>

      {/* Left orange accent rule */}
      <motion.div
        className="absolute left-0 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent pointer-events-none"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ ...cinematic, delay: 0.3 }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
};

export default BiographyChapterUI;
