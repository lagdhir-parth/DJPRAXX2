import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

import { HowlerEngine, TRACKS } from "../../audio/howlerEngine";

interface PraxxRadioSceneProps {
  onNext: () => void;
}

const WAVE_BARS = [
  18, 28, 42, 30, 54, 68, 38, 75, 44, 82, 58, 34, 64, 92, 71, 50, 86, 98, 62,
  46, 76, 89, 56, 35, 66, 80, 48, 93, 72, 41, 61, 84, 52, 31, 70, 95, 59, 40,
  78, 88, 55, 36, 63, 79, 47, 90, 69, 43,
];

interface RangeControlProps {
  min: number;
  max: number;
  step: number;
  value: number;
  ariaLabel: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeControl: React.FC<RangeControlProps> = ({
  min,
  max,
  step,
  value,
  ariaLabel,
  onChange,
}) => {
  const percent =
    max <= min
      ? 0
      : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="relative h-4 w-full rounded-full focus-within:ring-2 focus-within:ring-[#f07c22]/35">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#f07c22] to-[#ffaf75] shadow-[0_0_10px_rgba(240,124,34,0.5)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <span
        className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-[#f07c22] shadow-[0_0_12px_rgba(240,124,34,0.5)]"
        style={{ left: `${percent}%` }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
};

const formatTime = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const PraxxRadioScene: React.FC<PraxxRadioSceneProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({
    midnight_drive: true,
  });

  useEffect(() => {
    const syncState = () => {
      const state = HowlerEngine.getState();
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
      setCurrentTrackIndex(state.currentTrackIndex);
      setPlaybackTime(state.playbackTime);
    };

    syncState();
    const unsubscribe = HowlerEngine.subscribe(syncState);
    return unsubscribe;
  }, []);

  const currentTrack = TRACKS[currentTrackIndex] ?? TRACKS[0];

  const progress = useMemo(() => {
    if (!currentTrack?.duration) return 0;
    return Math.min(
      100,
      Math.max(0, (playbackTime / currentTrack.duration) * 100),
    );
  }, [playbackTime, currentTrack?.duration]);

  const handleTrackSelect = (index: number) => {
    HowlerEngine.setTrack(index);
    if (!isPlaying) HowlerEngine.play();
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    setPlaybackTime(nextTime);
    HowlerEngine.seekTo(nextTime);
  };

  const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    HowlerEngine.setVolume(nextVolume);
  };

  const toggleFavorite = (trackId: string) => {
    setIsLiked((previous) => ({
      ...previous,
      [trackId]: !previous[trackId],
    }));
  };

  return (
    <section className="relative flex justify-center items-center w-full overflow-visible px-3 pb-8 pt-4 sm:pt-6 text-white sm:px-5 sm:pb-10 lg:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto flex w-full max-w-[1160px] flex-col"
      >
        <div className="relative">
          <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-[#f07c22]/30 via-white/10 to-transparent opacity-70 blur-[1px]" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0e]/95 shadow-[0_24px_90px_rgba(0,0,0,0.72),0_0_60px_rgba(240,124,34,0.07)] backdrop-blur-2xl">
            <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                </div>

                <span className="font-['Syne'] text-xs font-bold uppercase tracking-[0.3em] text-white/85 sm:text-sm">
                  PRAXX <span className="text-[#f07c22]">RADIO</span>
                </span>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/25">
                  Analog soul / digital heart
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#f07c22] shadow-[0_0_12px_rgba(240,124,34,0.95)]" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="relative border-b border-white/10 p-4 sm:p-5 md:p-6 lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_55%,rgba(240,124,34,0.08),transparent_34%)]" />

                <div className="relative grid gap-6 md:grid-cols-[minmax(220px,0.82fr)_minmax(280px,1.18fr)] md:items-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative aspect-square w-full max-w-[250px] sm:max-w-[300px] md:max-w-[330px] lg:max-w-[350px]">
                      <div className="absolute inset-[9%] rounded-full bg-[#f07c22]/15 blur-3xl" />

                      <div className="absolute inset-0 rounded-full border border-white/5 bg-[radial-gradient(circle_at_50%_50%,#111116_0%,#0b0b0f_62%,#060608_100%)] shadow-[inset_0_0_50px_rgba(255,255,255,0.025),0_18px_45px_rgba(0,0,0,0.8)]" />

                      <div
                        className={`absolute inset-[7%] rounded-full border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.8)] ${
                          isPlaying ? "animate-[spin_7s_linear_infinite]" : ""
                        }`}
                        style={{
                          background:
                            "repeating-radial-gradient(circle at center, #09090b 0px, #09090b 2px, #17171c 3px, #09090b 5px), conic-gradient(from 212deg, transparent 0deg, rgba(255,255,255,.16) 18deg, transparent 34deg, transparent 180deg, rgba(240,124,34,.09) 212deg, transparent 250deg)",
                        }}
                      >
                        <div className="absolute inset-[33%] rounded-full border border-[#f07c22]/25 bg-[radial-gradient(circle_at_38%_30%,#b04a13_0%,#6f2409_42%,#24100a_100%)] shadow-[inset_0_0_22px_rgba(255,160,85,0.18),0_0_20px_rgba(240,124,34,0.12)]">
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="font-['Syne'] text-[9px] font-black tracking-[0.3em] text-white/90 sm:text-[10px]">
                              PRAXX
                            </span>
                            <span className="mt-1 font-mono text-[6px] uppercase tracking-[0.22em] text-[#ffc08f]/80 sm:text-[7px]">
                              Radio 01
                            </span>
                            <span className="mt-2 h-2 w-2 rounded-full border border-white/35 bg-black shadow-[inset_0_0_4px_white]" />
                          </div>
                        </div>
                      </div>

                      <div className="pointer-events-none absolute right-[2%] top-[11%] hidden h-[78%] w-[26%] sm:block">
                        <div className="absolute right-1 top-1 h-11 w-11 rounded-full border border-white/10 bg-[radial-gradient(circle,#25252c_0%,#0d0d11_70%)] shadow-[0_10px_24px_rgba(0,0,0,0.65)]" />
                        <div className="absolute right-[22px] top-10 h-[68%] w-[7px] origin-top rotate-[20deg] rounded-full border border-white/5 bg-gradient-to-r from-[#141419] via-[#383842] to-[#101014] shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                        <div className="absolute bottom-[9%] left-[34%] h-4 w-9 rotate-[18deg] rounded-sm border border-white/10 bg-[#17171c] shadow-[0_6px_14px_rgba(0,0,0,0.7)]" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.22em] text-white/30">
                      <span>33⅓ RPM</span>
                      <span className="h-1 w-1 rounded-full bg-[#f07c22]/70" />
                      <span>Stereo high fidelity</span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.32em] text-[#f07c22]">
                          Now playing
                        </p>

                        <h3 className="truncate font-['Syne'] text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl lg:text-[34px]">
                          {currentTrack.title}
                        </h3>

                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-['Space_Grotesk'] text-[9px] uppercase tracking-[0.16em] text-white/50">
                            {currentTrack.genre}
                          </span>
                          <span className="rounded-full border border-[#f07c22]/20 bg-[#f07c22]/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#ffad70]">
                            {currentTrack.bpm} BPM
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(currentTrack.id)}
                        aria-label="Toggle favorite"
                        className="group flex min-h-[44px] min-w-[44px] h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#f07c22]/40 hover:bg-[#f07c22]/10 cursor-pointer"
                      >
                        <Heart
                          className={`h-4 w-4 transition-all ${
                            isLiked[currentTrack.id]
                              ? "fill-[#f07c22] text-[#f07c22] drop-shadow-[0_0_8px_rgba(240,124,34,0.8)]"
                              : "text-white/35 group-hover:text-[#f07c22]"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="relative mb-3 h-20 overflow-hidden rounded-xl border border-white/10 bg-black/35 px-3 py-3 shadow-[inset_0_0_30px_rgba(0,0,0,0.55)] sm:h-24">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent)]" />
                      <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-white/5" />

                      <div className="relative flex h-full items-center gap-[2px]">
                        {WAVE_BARS.map((base, index) => {
                          const pulse = isPlaying
                            ? 0.72 +
                              Math.sin(playbackTime * 4.2 + index * 0.55) * 0.18
                            : 0.35;
                          const height = Math.max(
                            10,
                            Math.min(100, base * pulse),
                          );
                          const played =
                            (index / (WAVE_BARS.length - 1)) * 100 <= progress;

                          return (
                            <span
                              key={index}
                              className="min-w-[2px] flex-1 rounded-full transition-[height,opacity] duration-150"
                              style={{
                                height: `${height}%`,
                                background: played
                                  ? "linear-gradient(180deg,#ffb37c 0%,#f07c22 48%,#9f3a08 100%)"
                                  : "linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,.08))",
                                boxShadow: played
                                  ? "0 0 10px rgba(240,124,34,.28)"
                                  : "none",
                                opacity: played ? 1 : 0.5,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="mb-2 flex items-center justify-between font-mono text-[9px] text-white/35">
                        <span>{formatTime(playbackTime)}</span>
                        <span>{formatTime(currentTrack.duration)}</span>
                      </div>

                      <RangeControl
                        min={0}
                        max={currentTrack.duration || 0}
                        step={0.1}
                        value={Math.min(
                          playbackTime,
                          currentTrack.duration || 0,
                        )}
                        onChange={handleSeek}
                        ariaLabel="Seek track"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => HowlerEngine.prevTrack()}
                        aria-label="Previous track"
                        className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                      >
                        <SkipBack className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => HowlerEngine.togglePlay()}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="relative flex min-h-[52px] min-w-[52px] h-[52px] w-[52px] items-center justify-center rounded-full bg-[#f07c22] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_0_28px_rgba(240,124,34,0.34),0_12px_24px_rgba(0,0,0,0.35)] transition hover:scale-[1.04] hover:bg-[#ff8c35] active:scale-95 sm:h-14 sm:w-14 cursor-pointer"
                      >
                        <span className="absolute -inset-1.5 rounded-full border border-[#f07c22]/20" />
                        {isPlaying ? (
                          <Pause className="h-5 w-5 fill-current" />
                        ) : (
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => HowlerEngine.nextTrack()}
                        aria-label="Next track"
                        className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>

                      <div className="ml-auto flex min-w-[150px] flex-1 items-center justify-end gap-2 sm:max-w-[190px] sm:flex-none">
                        <button
                          type="button"
                          onClick={() => HowlerEngine.toggleMute()}
                          aria-label={isMuted ? "Unmute" : "Mute"}
                          className="flex min-h-[44px] min-w-[44px] h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/45 transition hover:bg-white/5 hover:text-white cursor-pointer"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>

                        <RangeControl
                          min={0}
                          max={1}
                          step={0.01}
                          value={volume}
                          onChange={handleVolume}
                          ariaLabel="Volume"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="flex flex-col bg-white/[0.015] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/30">
                      Curated broadcast
                    </p>
                    <h4 className="mt-1 font-['Syne'] text-base font-bold uppercase tracking-[0.1em] text-white/90">
                      Exclusives queue
                    </h4>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[8px] text-white/35">
                    {TRACKS.length.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  {TRACKS.map((track, index) => {
                    const active = index === currentTrackIndex;

                    return (
                      <button
                        type="button"
                        key={track.id}
                        onClick={() => handleTrackSelect(index)}
                        className={`group relative w-full overflow-hidden rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
                          active
                            ? "border-[#f07c22]/35 bg-[#f07c22]/10 shadow-[inset_0_0_20px_rgba(240,124,34,0.035)]"
                            : "border-transparent bg-white/[0.018] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        {active && (
                          <span className="absolute inset-y-3 left-0 w-[2px] rounded-full bg-[#f07c22] shadow-[0_0_14px_rgba(240,124,34,0.85)]" />
                        )}

                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[8px] ${
                              active
                                ? "border-[#f07c22]/30 bg-[#f07c22]/10 text-[#ffad70]"
                                : "border-white/10 bg-black/20 text-white/25"
                            }`}
                          >
                            {active && isPlaying ? (
                              <div className="flex h-3.5 items-end gap-[2px]">
                                <span className="h-2 w-[2px] animate-pulse bg-[#f07c22]" />
                                <span className="h-3.5 w-[2px] animate-pulse bg-[#f07c22] [animation-delay:120ms]" />
                                <span className="h-2.5 w-[2px] animate-pulse bg-[#f07c22] [animation-delay:240ms]" />
                              </div>
                            ) : (
                              `${index + 1}`.padStart(2, "0")
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`truncate font-['Space_Grotesk'] text-xs font-semibold ${
                                active
                                  ? "text-white"
                                  : "text-white/60 group-hover:text-white/85"
                              }`}
                            >
                              {track.title}
                            </p>
                            <p className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                              {track.genre}
                            </p>
                          </div>

                          <div className="text-right">
                            <p
                              className={`font-mono text-[8px] ${
                                active ? "text-[#f07c22]" : "text-white/30"
                              }`}
                            >
                              {track.bpm}
                            </p>
                            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.16em] text-white/20">
                              BPM
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/25">
                        DJ PRAXX
                      </p>
                      <p className="mt-1 font-['Space_Grotesk'] text-[11px] text-white/55">
                        Night broadcast · Exclusive edits
                      </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f07c22]/20 bg-[#f07c22]/10">
                      <Radio className="h-3.5 w-3.5 text-[#f07c22]" />
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center sm:mt-7">
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#f07c22]/30 bg-[#f07c22]/10 px-5 py-2.5 font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffad70] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:border-[#f07c22]/60 hover:bg-[#f07c22] hover:text-black hover:shadow-[0_0_28px_rgba(240,124,34,0.28)] active:scale-95 sm:px-6 sm:py-3 sm:text-[11px]"
          >
            Explore other scene
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default PraxxRadioScene;
