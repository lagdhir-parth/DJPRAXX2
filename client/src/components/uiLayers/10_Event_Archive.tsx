import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "../../context/SceneContext";
import { EVENTS_DATA, type EventItem } from "../scenes/10_11_Event_Archive";

const cinematic = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

interface EventRowProps {
  event: EventItem;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (event: EventItem) => void;
}

const EventRow: React.FC<EventRowProps> = ({
  event,
  index,
  isHovered,
  onHover,
  onSelect,
}) => {
  return (
    <motion.button
      type="button"
      className="pointer-events-auto w-full group text-left cursor-pointer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(event.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(event)}
      aria-label={`View ${event.name}`}
    >
      <div
        className={`relative border-b transition-colors duration-200 min-h-[48px] py-3.5 sm:py-4.5 flex items-center gap-2.5 sm:gap-6 ${
          isHovered
            ? "border-primary/50"
            : "border-white/10"
        }`}
      >
        {/* Hover fill — subtle left flush orange */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Index number */}
        <span className="font-['Space_Grotesk'] text-[10px] text-white/30 w-5 sm:w-6 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Category */}
        <span
          className={`hidden sm:block font-['Space_Grotesk'] text-[9px] tracking-[0.25em] uppercase w-20 shrink-0 transition-colors duration-200 ${
            isHovered ? "text-primary" : "text-white/35"
          }`}
        >
          {event.category}
        </span>

        {/* Event name */}
        <span
          className={`flex-1 font-['Syne'] text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight transition-colors duration-200 truncate ${
            isHovered ? "text-white" : "text-white/85"
          }`}
        >
          {event.name}
        </span>

        {/* Location */}
        <span className="hidden md:block font-['Inter'] text-xs sm:text-sm text-white/45 shrink-0">
          {event.location}
        </span>

        {/* Date */}
        <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs text-white/40 shrink-0 tabular-nums">
          {event.date}
        </span>

        {/* Arrow indicator */}
        <span
          className={`font-['Space_Grotesk'] text-[12px] tracking-[0.2em] transition-all duration-200 ${
            isHovered
              ? "text-primary translate-x-1 opacity-100"
              : "text-white/20 opacity-0 sm:opacity-60"
          }`}
        >
          →
        </span>
      </div>
    </motion.button>
  );
};

interface EventArchiveUIProps {
  onSelectEvent?: (event: EventItem) => void;
}

const EventArchiveUI: React.FC<EventArchiveUIProps> = ({ onSelectEvent }) => {
  const { handleSelectScene, setActiveScene } = useScene();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = (event: EventItem) => {
    if (onSelectEvent) {
      onSelectEvent(event);
    }
    setActiveScene("11_event_detail");
  };

  return (
    <div className="absolute inset-0 z-30 pointer-events-none select-none flex flex-col backdrop-blur-xs overflow-y-auto overflow-x-hidden overscroll-contain">
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent z-10 pointer-events-none" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 to-transparent z-10 pointer-events-none" />
      {/* Left vignette */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-black/60 to-transparent pointer-events-none" />

      {/* Content container — vertically scrollable if viewport is short */}
      <div className="relative z-20 flex flex-col justify-start sm:justify-center min-h-full px-4 sm:px-10 lg:px-16 pt-20 pb-24 sm:pt-24 sm:pb-16 pointer-events-auto">
        {/* Section heading */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cinematic, delay: 0.15 }}
        >
          <p className="font-['Space_Grotesk'] text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-primary mb-2">
            Moments That Matter
          </p>
          <h1 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight text-white drop-shadow-md">
            Event Archive
          </h1>
        </motion.div>

        {/* Event list */}
        <div className="w-full max-w-3xl">
          {/* Column headers — desktop only */}
          <motion.div
            className="hidden sm:flex items-center gap-3 sm:gap-6 pb-2.5 border-b border-white/10 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="font-['Space_Grotesk'] text-[8px] tracking-[0.3em] uppercase text-white/30 w-5 sm:w-6" />
            <span className="font-['Space_Grotesk'] text-[8px] tracking-[0.3em] uppercase text-white/30 w-20 hidden sm:block">
              Type
            </span>
            <span className="font-['Space_Grotesk'] text-[8px] tracking-[0.3em] uppercase text-white/30 flex-1">
              Event
            </span>
            <span className="font-['Space_Grotesk'] text-[8px] tracking-[0.3em] uppercase text-white/30 hidden md:block shrink-0">
              Location
            </span>
            <span className="font-['Space_Grotesk'] text-[8px] tracking-[0.3em] uppercase text-white/30 shrink-0">
              Date
            </span>
            <span className="w-4" />
          </motion.div>

          {EVENTS_DATA.map((event, index) => (
            <EventRow
              key={event.id}
              event={event}
              index={index}
              isHovered={hoveredId === event.id}
              onHover={setHoveredId}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Forward nav */}
        <motion.button
          className="pointer-events-auto mt-6 sm:mt-10 self-start flex items-center min-h-[44px] font-['Space_Grotesk'] text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/50 hover:text-primary transition-colors duration-200 border-b border-white/20 hover:border-primary/50 pb-1 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => handleSelectScene("12_biography_entrance")}
          aria-label="Continue to biography"
        >
          Read the story
        </motion.button>
      </div>
    </div>
  );
};

export default EventArchiveUI;
