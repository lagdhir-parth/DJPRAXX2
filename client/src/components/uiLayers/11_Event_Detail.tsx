import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScene } from "../../context/SceneContext";
import { EVENTS_DATA, type EventItem } from "../scenes/10_11_Event_Archive";

const cinematic = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

interface EventDetailUIProps {
  selectedEvent?: EventItem;
  onSelectEvent?: (event: EventItem) => void;
}

const EventDetailUI: React.FC<EventDetailUIProps> = ({
  selectedEvent = EVENTS_DATA[0],
  onSelectEvent,
}) => {
  const { setActiveScene } = useScene();

  const currentIndex = EVENTS_DATA.findIndex((e) => e.id === selectedEvent.id);
  const prevEvent = currentIndex > 0 ? EVENTS_DATA[currentIndex - 1] : null;
  const nextEvent =
    currentIndex < EVENTS_DATA.length - 1
      ? EVENTS_DATA[currentIndex + 1]
      : null;

  const goTo = (event: EventItem) => {
    if (onSelectEvent) {
      onSelectEvent(event);
    }
  };

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none backdrop-blur-xs">
      {/* Heavy bottom and left darkness to guarantee crisp text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-linear-to-r from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/60 to-transparent" />

      {/* Back to archive button */}
      <motion.button
        className="pointer-events-auto absolute top-16 sm:top-24 left-4 sm:left-10 lg:left-16 flex items-center gap-2 font-['Space_Grotesk'] text-[11px] tracking-[0.25em] uppercase text-white/70 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] py-2 px-1 z-20"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...cinematic, delay: 0.15 }}
        onClick={() => setActiveScene("10_event_archive")}
        aria-label="Back to event archive"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Archive</span>
      </motion.button>

      {/* Main event content — left-bottom composition */}
      <div className="absolute bottom-24 sm:bottom-24 left-4 sm:left-10 lg:left-16 right-4 sm:right-auto max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Category + Date */}
        <motion.div
          className="flex items-center gap-3 mb-2 sm:mb-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cinematic, delay: 0.2 }}
        >
          <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
            {selectedEvent.category}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.2em] text-white/60">
            {selectedEvent.date}
          </span>
        </motion.div>

        {/* Event title */}
        <motion.h1
          className="font-['Syne'] text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-white mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cinematic, delay: 0.3 }}
        >
          {selectedEvent.name}
        </motion.h1>

        {/* Location */}
        <motion.p
          className="font-['Inter'] text-xs sm:text-base text-white/70 mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {selectedEvent.location}
        </motion.p>

        {/* Highlight quote */}
        <motion.p
          className="font-['Inter'] text-xs sm:text-base text-white/90 leading-relaxed border-l-2 border-primary pl-3 sm:pl-4 italic drop-shadow-sm mb-3 sm:mb-4"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...cinematic, delay: 0.45 }}
        >
          "{selectedEvent.highlight}"
        </motion.p>

        {/* Real attendance data */}
        <motion.p
          className="font-['Space_Grotesk'] text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-primary/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {selectedEvent.attendees} in attendance
        </motion.p>
      </div>

      {/* Prev / Next navigation — bottom right */}
      <motion.div
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 right-4 sm:right-10 lg:right-16 flex items-center gap-4 sm:gap-6 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...cinematic, delay: 0.5 }}
      >
        {prevEvent ? (
          <button
            type="button"
            onClick={() => goTo(prevEvent)}
            aria-label={`Previous event: ${prevEvent.name}`}
            className="flex items-center gap-1.5 font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Prev Event
          </button>
        ) : (
          <span />
        )}

        {nextEvent ? (
          <button
            type="button"
            onClick={() => goTo(nextEvent)}
            aria-label={`Next event: ${nextEvent.name}`}
            className="flex items-center gap-1.5 font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] py-1"
          >
            Next Event
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span />
        )}
      </motion.div>

      {/* Thin horizontal bottom rule */}
      <motion.div
        className="absolute bottom-16 left-6 sm:left-10 lg:left-16 right-6 sm:right-10 lg:right-16 h-px bg-white/10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
};

export default EventDetailUI;
