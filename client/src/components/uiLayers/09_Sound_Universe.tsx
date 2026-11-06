import React, { useState } from "react";

import { HowlerEngine } from "../../audio/howlerEngine";

import {
  Activity,
  AudioWaveform,
  Disc3,
  Headphones,
  Radio,
  Sparkles,
} from "lucide-react";

interface GenreNode {
  id: string;

  name: string;

  bpmRange: string;

  vibe: string;

  signature: string;

  /**

   * Desktop coordinates.

   * Values are percentages relative to the universe canvas.

   */

  x: number;

  y: number;

  /**

   * Slight variation in sphere size makes the composition

   * feel much more organic / 3D.

   */

  size: number;
}

const GENRES: GenreNode[] = [
  {
    id: "bollywood",

    name: "BOLLYWOOD",

    bpmRange: "124–130 BPM",

    vibe: "Iconic vocal hooks fused with cinematic melodies, modern club percussion and high-energy festival drops.",

    signature: "Rajkot Festival Edit • Kesariya Progressive Remix",

    x: 25,

    y: 23,

    size: 84,
  },

  {
    id: "edm",

    name: "EDM",

    bpmRange: "128–132 BPM",

    vibe: "Massive festival anthems with atmospheric buildups, aggressive synth architecture and laser-locked drops.",

    signature: "Arena Lead Drops • Stadium Risers",

    x: 51,

    y: 13,

    size: 78,
  },

  {
    id: "house",

    name: "HOUSE",

    bpmRange: "123–126 BPM",

    vibe: "Rolling sub-bass, hypnotic grooves and tight percussion designed for deep late-night dance floors.",

    signature: "Deep Midnight Grooves • Club Tool 04",

    x: 76,

    y: 28,

    size: 86,
  },

  {
    id: "club",

    name: "CLUB",

    bpmRange: "126–128 BPM",

    vibe: "High-impact crowd movers engineered around explosive transitions, punchy drums and peak-hour energy.",

    signature: "Peak-Hour Euphoria • VIP Mashups",

    x: 88,

    y: 51,

    size: 70,
  },

  {
    id: "punjabi",

    name: "PUNJABI",

    bpmRange: "98–110 / 130 BPM",

    vibe: "Heavy dhol rhythms collide with modern electronic production and rumbling club-ready low end.",

    signature: "Dhol Club Rework • Brown Munde Progressive",

    x: 71,

    y: 78,

    size: 86,
  },

  {
    id: "retro",

    name: "RETRO",

    bpmRange: "120–125 BPM",

    vibe: "Vintage disco and 80s/90s nostalgia rebuilt through modern mastering, bass design and contemporary drums.",

    signature: "Disco Nights Re-Edit • Golden Era Flip",

    x: 28,

    y: 79,

    size: 82,
  },

  {
    id: "hiphop",

    name: "HIP-HOP",

    bpmRange: "95–105 BPM",

    vibe: "Deep halftime bounce, gritty 808 pressure, sharp snares and atmospheric urban textures.",

    signature: "Trap Fusion Stems • Late Night Flip",

    x: 11,

    y: 53,

    size: 78,
  },
];

export const SoundUniverseScene: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<GenreNode>(GENRES[0]);

  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null);

  const handleSelectGenre = (genre: GenreNode) => {
    setSelectedGenre(genre);

    HowlerEngine.triggerLightPulseSound();
  };

  return (
    <section className="relative flex justify-center items-center w-full overflow-visible px-3 py-4 sm:px-4 md:px-6 md:py-8 xl:px-0 backdrop-blur-xs">
      <style>{`

        @keyframes praxxOrbitRotate {

          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {

            transform: translate(-50%, -50%) rotate(360deg);

          }

        }



        @keyframes praxxOrbitReverse {

          from {

            transform: translate(-50%, -50%) rotate(360deg);

          }

          to {

            transform: translate(-50%, -50%) rotate(0deg);

          }

        }



        @keyframes praxxCoreFloat {

          0%, 100% {

            transform: translateY(0px) scale(1);

          }

          50% {

            transform: translateY(-6px) scale(1.015);

          }

        }



        @keyframes praxxPulse {

          0%, 100% {

            opacity: .45;

            transform: scale(.96);

          }

          50% {

            opacity: .9;

            transform: scale(1.05);

          }

        }



        @keyframes praxxParticle {

          0%, 100% {

            opacity: .1;

            transform: scale(.7);

          }

          50% {

            opacity: 1;

            transform: scale(1.5);

          }

        }



        @keyframes praxxScan {

          0% {

            transform: translateY(-120%);

            opacity: 0;

          }

          20% {

            opacity: .2;

          }

          80% {

            opacity: .12;

          }

          100% {

            transform: translateY(300%);

            opacity: 0;

          }

        }



        @keyframes praxxSelectedRing {

          from {

            transform: scale(.88);

            opacity: .8;

          }

          to {

            transform: scale(1.35);

            opacity: 0;

          }

        }



        @keyframes praxxEqualizer {

          0%, 100% {

            transform: scaleY(.35);

          }

          50% {

            transform: scaleY(1);

          }

        }

      `}</style>

      <div
        className="

          relative mx-auto

          grid w-full min-w-0 max-w-[1150px] grid-cols-1

          items-center

          gap-6 md:gap-8

          xl:grid-cols-[minmax(0,1fr)_390px]

          xl:gap-10

        "
      >
        {/* =========================================================

            SOUND UNIVERSE

        ========================================================== */}

        <div
          className="

            relative

            mx-auto

            aspect-[1.12/1]

            w-full

            min-w-0

            max-w-[780px]

            min-h-[260px]

            sm:min-h-[380px]

            overflow-hidden

            rounded-[28px] sm:rounded-[40px]

            border border-white/[0.06]

            bg-white/[0.012]

            md:min-h-[500px]

            xl:min-h-[560px]

          "
        >
          {/* subtle inner vignette */}

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 49%, rgba(240,124,34,.06) 0%, rgba(240,124,34,.018) 31%, transparent 54%)",
            }}
          />

          {/* top reflection */}

          <div
            className="

              pointer-events-none

              absolute

              left-[12%]

              right-[12%]

              top-0

              h-[1px]

            "
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)",
            }}
          />

          {/* =====================================================

              PARTICLES

          ====================================================== */}

          {[
            [18, 16, 0],

            [36, 11, 1.7],

            [67, 12, 2.8],

            [84, 21, 0.8],

            [91, 39, 3.1],

            [84, 67, 2],

            [63, 89, 1],

            [38, 91, 2.6],

            [14, 73, 1.5],

            [7, 38, 3.5],

            [61, 31, 0.6],

            [33, 61, 2.2],

            [70, 61, 3],

            [45, 76, 1.2],
          ].map(([x, y, delay], index) => (
            <span
              key={index}
              className="

                pointer-events-none

                absolute

                z-[1]

                h-[2px]

                w-[2px]

                rounded-full

                bg-orange-200

                shadow-[0_0_8px_rgba(240,124,34,.95)]

              "
              style={{
                left: `${x}%`,

                top: `${y}%`,

                animation: `praxxParticle ${
                  2.8 + (index % 4) * 0.45
                }s ease-in-out ${delay}s infinite`,
              }}
            />
          ))}

          {/* =====================================================

              ORBITAL LINES - SVG

          ====================================================== */}

          <svg
            viewBox="0 0 1000 720"
            preserveAspectRatio="none"
            className="

              pointer-events-none

              absolute inset-0

              z-[2]

              h-full w-full

            "
          >
            <defs>
              <linearGradient id="orbitOrange" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#f07c22" stopOpacity="0" />

                <stop offset="28%" stopColor="#f07c22" stopOpacity=".3" />

                <stop offset="50%" stopColor="#ffb36b" stopOpacity=".7" />

                <stop offset="72%" stopColor="#f07c22" stopOpacity=".25" />

                <stop offset="100%" stopColor="#f07c22" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="orbitWhite" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity=".02" />

                <stop offset="50%" stopColor="#fff" stopOpacity=".15" />

                <stop offset="100%" stopColor="#fff" stopOpacity=".015" />
              </linearGradient>

              <filter id="orbitGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />

                <feMerge>
                  <feMergeNode in="blur" />

                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse
              cx="500"
              cy="365"
              rx="370"
              ry="183"
              fill="none"
              stroke="url(#orbitOrange)"
              strokeWidth="1.2"
              transform="rotate(-11 500 365)"
            />

            <ellipse
              cx="500"
              cy="360"
              rx="415"
              ry="245"
              fill="none"
              stroke="url(#orbitWhite)"
              strokeWidth=".7"
              transform="rotate(18 500 360)"
            />

            <ellipse
              cx="500"
              cy="360"
              rx="320"
              ry="290"
              fill="none"
              stroke="url(#orbitOrange)"
              strokeWidth=".55"
              transform="rotate(58 500 360)"
            />

            <ellipse
              cx="500"
              cy="360"
              rx="260"
              ry="350"
              fill="none"
              stroke="url(#orbitWhite)"
              strokeWidth=".55"
              transform="rotate(102 500 360)"
            />

            <path
              d="M95 505 C250 395 340 280 495 165 C650 55 815 185 925 365"
              fill="none"
              stroke="url(#orbitOrange)"
              strokeWidth="1"
              opacity=".48"
              filter="url(#orbitGlow)"
            />

            <path
              d="M170 160 C325 290 720 340 855 560"
              fill="none"
              stroke="url(#orbitWhite)"
              strokeWidth=".7"
              opacity=".35"
            />

            <path
              d="M130 565 C360 610 645 585 908 475"
              fill="none"
              stroke="url(#orbitOrange)"
              strokeWidth=".8"
              opacity=".38"
            />
          </svg>

          {/* =====================================================

              ANIMATED ORBIT HALOS

          ====================================================== */}

          <div
            className="

              pointer-events-none

              absolute left-1/2 top-1/2

              z-[3]

              h-[62%] w-[72%]

              rounded-[50%]

              border border-primary/10

            "
            style={{
              animation: "praxxOrbitRotate 55s linear infinite",
            }}
          />

          <div
            className="

              pointer-events-none

              absolute left-1/2 top-1/2

              z-[3]

              h-[78%] w-[58%]

              rounded-[50%]

              border border-white/[0.035]

            "
            style={{
              animation: "praxxOrbitReverse 75s linear infinite",
            }}
          />

          {/* =====================================================

              CORE GLOW

          ====================================================== */}

          <div
            className="

              pointer-events-none

              absolute left-1/2 top-1/2

              z-[4]

              h-[46%] w-[46%]

              -translate-x-1/2 -translate-y-1/2

              rounded-full

              blur-[45px]

            "
            style={{
              background:
                "radial-gradient(circle, rgba(240,124,34,.18) 0%, rgba(240,124,34,.07) 35%, transparent 72%)",

              animation: "praxxPulse 4.8s ease-in-out infinite",
            }}
          />

          {/* =====================================================

              PRAXX PLANET

          ====================================================== */}

          <div
            className="

              absolute

              left-1/2 top-1/2

              z-10

              aspect-square

              w-[45%]

              max-w-[390px]

              -translate-x-1/2 -translate-y-1/2

              md:w-[42%]

            "
            style={{
              animation: "praxxCoreFloat 8s ease-in-out infinite",
            }}
          >
            {/* atmospheric outer glow */}

            <div
              className="

                absolute

                -inset-[10%]

                rounded-full

                blur-2xl

              "
              style={{
                background:
                  "radial-gradient(circle, rgba(240,124,34,.2) 0%, transparent 68%)",
              }}
            />

            {/* outer rim */}

            <div
              className="

                absolute

                inset-[-3px]

                rounded-full

                p-[1px]

              "
              style={{
                background:
                  "linear-gradient(140deg, rgba(255,255,255,.42), rgba(240,124,34,.65), rgba(255,255,255,.04) 42%, rgba(240,124,34,.3) 78%, rgba(255,255,255,.16))",
              }}
            >
              <div className="h-full w-full rounded-full bg-[#050507]" />
            </div>

            {/* planet */}

            <div
              className="

                relative

                h-full w-full

                overflow-hidden

                rounded-full

                border border-white/10

                shadow-[0_30px_80px_rgba(0,0,0,.8),0_0_45px_rgba(240,124,34,.18)]

              "
              style={{
                background:
                  "radial-gradient(circle at 38% 27%, #41434b 0%, #202127 18%, #101116 45%, #08090c 68%, #020203 100%)",
              }}
            >
              {/* land / terrain illusion */}

              <div
                className="

                  absolute

                  inset-[5%]

                  rounded-full

                  opacity-[.72]

                  blur-[1.5px]

                "
                style={{
                  background: `

                    radial-gradient(ellipse at 30% 31%, rgba(114,113,105,.32) 0 8%, transparent 9%),

                    radial-gradient(ellipse at 44% 24%, rgba(125,116,101,.26) 0 6%, transparent 7%),

                    radial-gradient(ellipse at 53% 41%, rgba(125,120,108,.25) 0 12%, transparent 13%),

                    radial-gradient(ellipse at 39% 54%, rgba(92,88,80,.3) 0 11%, transparent 12%),

                    radial-gradient(ellipse at 68% 58%, rgba(95,87,79,.24) 0 10%, transparent 11%),

                    radial-gradient(ellipse at 52% 72%, rgba(88,81,72,.25) 0 9%, transparent 10%)

                  `,
                }}
              />

              {/* orange horizon */}

              <div
                className="

                  absolute

                  -right-[12%]

                  top-[6%]

                  h-[88%]

                  w-[42%]

                  rounded-full

                  blur-[10px]

                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent 5%, rgba(240,124,34,.09) 34%, rgba(255,145,62,.33) 78%, rgba(255,181,105,.75))",
                }}
              />

              {/* top light */}

              <div
                className="

                  absolute

                  left-[13%]

                  top-[5%]

                  h-[32%]

                  w-[65%]

                  rounded-[50%]

                  opacity-40

                  blur-2xl

                "
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,.34), transparent 65%)",
                }}
              />

              {/* lower shadow */}

              <div
                className="

                  absolute

                  -bottom-[25%]

                  left-[-5%]

                  h-[60%]

                  w-[110%]

                  rounded-full

                  bg-black/80

                  blur-2xl

                "
              />

              {/* scanning light */}

              <div
                className="

                  pointer-events-none

                  absolute

                  left-[-10%]

                  top-0

                  h-[32%]

                  w-[120%]

                  rotate-[-10deg]

                  blur-xl

                "
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(240,124,34,.18), transparent)",

                  animation: "praxxScan 8s linear infinite",
                }}
              />

              {/* PRAXX branding */}

              <div
                className="

                  absolute

                  inset-0

                  z-20

                  flex

                  flex-col

                  items-center

                  justify-center

                  text-center

                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-5 bg-linear-to-r from-transparent to-primary/80" />

                  <Sparkles className="h-3.5 w-3.5 text-primary" />

                  <span className="h-px w-5 bg-linear-to-l from-transparent to-primary/80" />
                </div>

                <div
                  className="

                    font-display

                    text-[clamp(1.45rem,4vw,3rem)]

                    font-semibold

                    tracking-[0.34em]

                    text-white

                    drop-shadow-[0_4px_20px_rgba(0,0,0,.9)]

                  "
                >
                  PR
                  <span className="text-primary">A</span>
                  XX
                </div>

                <div
                  className="

                    mt-2

                    font-tech

                    text-[7px]

                    font-medium

                    tracking-[0.5em]

                    text-white/55

                    sm:text-[9px]

                  "
                >
                  SOUND UNIVERSE
                </div>

                <div
                  className="

                    mt-5

                    flex

                    items-center

                    gap-[3px]

                    opacity-70

                  "
                >
                  {[10, 17, 25, 14, 22, 9, 19].map((height, i) => (
                    <span
                      key={i}
                      className="

                        block

                        w-[2px]

                        origin-center

                        rounded-full

                        bg-primary

                      "
                      style={{
                        height,

                        animation: `praxxEqualizer ${
                          0.65 + i * 0.06
                        }s ease-in-out ${i * 0.08}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* glass reflection */}

              <div
                className="

                  pointer-events-none

                  absolute

                  left-[14%]

                  top-[8%]

                  h-[32%]

                  w-[41%]

                  rotate-[-20deg]

                  rounded-[50%]

                  opacity-30

                  blur-lg

                "
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,.6), transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* =====================================================

              GENRE PLANETS

          ====================================================== */}

          {GENRES.map((genre, index) => {
            const isSelected = genre.id === selectedGenre.id;

            const isHovered = genre.id === hoveredGenre;

            return (
              <div
                key={genre.id}
                className="

                  absolute

                  z-20

                  -translate-x-1/2

                  -translate-y-1/2

                "
                style={{
                  left: `${genre.x}%`,

                  top: `${genre.y}%`,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSelectGenre(genre)}
                  onMouseEnter={() => setHoveredGenre(genre.id)}
                  onMouseLeave={() => setHoveredGenre(null)}
                  aria-label={`Select ${genre.name}`}
                  aria-pressed={isSelected}
                  className="

                    group

                    relative

                    flex

                    aspect-square

                    items-center

                    justify-center

                    rounded-full

                    outline-none

                    transition-all

                    duration-500

                    ease-out

                    focus-visible:ring-2

                    focus-visible:ring-primary

                    focus-visible:ring-offset-2

                    focus-visible:ring-offset-[#050507]

                  "
                  style={{
                    width: `clamp(50px, ${genre.size / 11}vw, ${genre.size}px)`,

                    transform:
                      isSelected || isHovered
                        ? "scale(1.12) translateY(-3px)"
                        : "scale(1)",

                    filter:
                      isSelected || isHovered
                        ? "brightness(1.18)"
                        : "brightness(.82)",
                  }}
                >
                  {/* expanding selected ring */}

                  {isSelected && (
                    <span
                      className="

                        pointer-events-none

                        absolute

                        inset-[-6px]

                        rounded-full

                        border border-primary/50

                      "
                      style={{
                        animation: "praxxSelectedRing 2s ease-out infinite",
                      }}
                    />
                  )}

                  {/* outer glow */}

                  <span
                    className="

                      pointer-events-none

                      absolute

                      -inset-[10px]

                      rounded-full

                      blur-xl

                      transition-opacity

                      duration-500

                    "
                    style={{
                      background:
                        "radial-gradient(circle, rgba(240,124,34,.32), transparent 67%)",

                      opacity: isSelected ? 0.92 : isHovered ? 0.55 : 0.15,
                    }}
                  />

                  {/* glass border */}

                  <span
                    className="

                      absolute

                      inset-0

                      rounded-full

                      p-[1px]

                    "
                    style={{
                      background: isSelected
                        ? "linear-gradient(145deg, rgba(255,225,196,.95), #f07c22 40%, rgba(234,88,12,.8) 72%, rgba(255,255,255,.2))"
                        : "linear-gradient(145deg, rgba(255,255,255,.28), rgba(240,124,34,.36), rgba(255,255,255,.03) 57%, rgba(240,124,34,.34))",
                    }}
                  >
                    <span
                      className="

                        relative

                        block

                        h-full

                        w-full

                        overflow-hidden

                        rounded-full

                        shadow-[inset_-15px_-20px_28px_rgba(0,0,0,.95),inset_6px_7px_14px_rgba(255,255,255,.08),0_12px_30px_rgba(0,0,0,.65)]

                      "
                      style={{
                        background:
                          "radial-gradient(circle at 35% 24%, #33343a 0%, #17181d 27%, #090a0d 60%, #020203 100%)",
                      }}
                    >
                      {/* orange side illumination */}

                      <span
                        className="

                          absolute

                          -bottom-[20%]

                          -right-[17%]

                          h-[78%]

                          w-[78%]

                          rounded-full

                          blur-[9px]

                        "
                        style={{
                          background:
                            "radial-gradient(circle, rgba(240,124,34,.42), rgba(234,88,12,.12) 45%, transparent 69%)",
                        }}
                      />

                      {/* specular */}

                      <span
                        className="

                          absolute

                          left-[20%]

                          top-[11%]

                          h-[24%]

                          w-[40%]

                          -rotate-[23deg]

                          rounded-full

                          bg-white/[0.13]

                          blur-md

                        "
                      />

                      {/* little orbit marker */}

                      <span
                        className="

                          absolute

                          right-[13%]

                          top-[19%]

                          h-1

                          w-1

                          rounded-full

                          bg-orange-100/70

                          shadow-[0_0_6px_rgba(240,124,34,.9)]

                        "
                      />

                      {/* genre text */}

                      <span
                        className="

                          absolute

                          inset-0

                          flex

                          items-center

                          justify-center

                          px-2

                          text-center

                          font-tech

                          text-[7px]

                          font-bold

                          tracking-[0.08em]

                          text-white/80

                          transition-all

                          duration-300

                          group-hover:text-white

                          sm:text-[9px]

                          md:text-[10px]

                        "
                      >
                        {genre.name}
                      </span>
                    </span>
                  </span>

                  {/* number label */}

                  <span
                    className="

                      absolute

                      -right-1

                      -top-1

                      flex

                      h-4

                      min-w-4

                      items-center

                      justify-center

                      rounded-full

                      border border-white/10

                      bg-black/80

                      px-1

                      font-tech

                      text-[6px]

                      text-white/35

                      backdrop-blur-xl

                    "
                  >
                    0{index + 1}
                  </span>
                </button>
              </div>
            );
          })}

          {/* side micro labels */}

          <div
            className="

              pointer-events-none

              absolute

              bottom-5

              left-5

              z-30

              hidden

              items-center

              gap-2

              font-tech

              text-[8px]

              tracking-[0.25em]

              text-white/25

              md:flex

            "
          >
            <Radio className="h-3 w-3 text-primary/50" />
            ORBITAL AUDIO NETWORK
          </div>

          <div
            className="

              pointer-events-none

              absolute

              bottom-5

              right-5

              z-30

              hidden

              items-center

              gap-2

              font-tech

              text-[8px]

              tracking-[0.25em]

              text-white/25

              md:flex

            "
          >
            LIVE FREQUENCY MAP
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          </div>
        </div>

        {/* =========================================================

            SELECTED GENRE HUD

        ========================================================== */}

        <aside
          className="

            relative

            mx-auto

            w-full

            min-w-0

            max-w-[520px]

            overflow-hidden

            rounded-[30px]

            border border-white/[0.08]

            bg-[#0c0d12]/80

            p-[1px]

            shadow-[0_30px_80px_rgba(0,0,0,.36)]

            backdrop-blur-2xl

            xl:max-w-none

          "
        >
          {/* subtle active top edge */}

          <div
            className="

              pointer-events-none

              absolute

              left-[12%]

              right-[12%]

              top-0

              z-20

              h-px

            "
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(240,124,34,.8), rgba(255,255,255,.3), rgba(240,124,34,.8), transparent)",
            }}
          />

          <div
            className="

              relative

              overflow-hidden

              rounded-[29px]

              bg-[#090a0e]/95

              px-4

              py-5

              sm:px-6

              sm:py-6

              md:px-7

              md:py-7

            "
          >
            {/* detail-card ambient glow */}

            <div
              className="

                pointer-events-none

                absolute

                -right-20

                -top-24

                h-64

                w-64

                rounded-full

                blur-[70px]

              "
              style={{
                background: "rgba(240,124,34,.13)",
              }}
            />

            {/* HUD header */}

            <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-5">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <div
                  className="

                    flex

                    h-9

                    w-9

                    sm:h-10

                    sm:w-10

                    items-center

                    justify-center

                    rounded-xl

                    border border-primary/20

                    bg-primary/[0.07]

                    shadow-[inset_0_0_18px_rgba(240,124,34,.08)]

                  "
                >
                  <AudioWaveform className="h-4.5 w-4.5 text-primary" />
                </div>

                <div>
                  <p
                    className="

                      font-tech

                      text-[7px]

                      font-medium

                      tracking-[0.24em]

                      sm:text-[8px]

                      sm:tracking-[0.32em]

                      text-primary

                    "
                  >
                    ACTIVE FREQUENCY
                  </p>

                  <p
                    className="

                      mt-1

                      font-tech

                      text-[7px]

                      sm:text-[8px]

                      tracking-[0.12em]

                      text-white/30

                    "
                  >
                    PRAXX AUDIO SYSTEM / 011
                  </p>
                </div>
              </div>

              <div
                className="

                  flex

                  items-center

                  gap-2

                  rounded-full

                  border border-emerald-400/10

                  bg-emerald-400/[0.04]

                  px-2.5

                  py-1.5

                "
              >
                <span
                  className="

                    h-1.5

                    w-1.5

                    animate-pulse

                    rounded-full

                    bg-emerald-400

                    shadow-[0_0_7px_rgba(52,211,153,.8)]

                  "
                />

                <span
                  className="

                    font-tech

                    text-[7px]

                    tracking-[0.14em]

                    text-emerald-300/80

                  "
                >
                  LIVE
                </span>
              </div>
            </div>

            {/* selected title */}

            <div className="relative z-10 mt-6 sm:mt-8">
              <div
                className="

                  font-display

                  text-[clamp(2rem,5vw,3.7rem)]

                  font-semibold

                  leading-[.9]

                  tracking-[-0.045em]

                  text-white

                "
              >
                {selectedGenre.name}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                <div
                  className="

                    flex

                    items-center

                    gap-2

                    rounded-full

                    border border-primary/20

                    bg-primary/[0.07]

                    px-3

                    py-1.5

                    font-tech

                    text-[9px]

                    text-orange-200

                  "
                >
                  <Activity className="h-3 w-3 text-primary" />

                  {selectedGenre.bpmRange}
                </div>

                <div
                  className="

                    flex

                    items-center

                    gap-2

                    rounded-full

                    border border-white/[0.07]

                    bg-white/[0.025]

                    px-3

                    py-1.5

                    font-tech

                    text-[9px]

                    text-white/50

                  "
                >
                  <Disc3 className="h-3 w-3" />
                  PRAXX MIX
                </div>
              </div>
            </div>

            {/* waveform visualization */}

            <div
              className="

                relative

                z-10

                mt-6

                flex

                h-[56px]

                sm:mt-8

                sm:h-[64px]

                items-center

                overflow-hidden

                rounded-2xl

                border border-white/[0.05]

                bg-black/20

                px-3

                sm:px-4

              "
            >
              <div className="flex h-full w-full items-center justify-between gap-[2px]">
                {Array.from({ length: 44 }).map((_, index) => {
                  const heights = [
                    12, 18, 27, 19, 34, 47, 29, 55, 37, 22, 43, 31, 58, 39, 25,

                    49, 63, 42, 26, 55, 34, 18,
                  ];

                  return (
                    <span
                      key={index}
                      className="

                        block

                        w-[2px]

                        rounded-full

                        bg-linear-to-t

                        from-primary/20

                        via-primary/70

                        to-orange-200/80

                      "
                      style={{
                        height: `${heights[index % heights.length]}%`,

                        opacity:
                          index > 33
                            ? 0.22 + ((44 - index) / 44) * 0.4
                            : 0.55 + (index % 4) * 0.1,
                      }}
                    />
                  );
                })}
              </div>

              <div
                className="

                  pointer-events-none

                  absolute

                  inset-y-0

                  left-[63%]

                  w-px

                  bg-primary

                  shadow-[0_0_12px_rgba(240,124,34,.9)]

                "
              />
            </div>

            {/* vibe */}

            <div
              className="

                relative

                z-10

                mt-5

                border-t border-white/[0.06]

                pt-5

                sm:mt-7

                sm:pt-6

              "
            >
              <div
                className="

                  mb-2

                  font-tech

                  text-[8px]

                  font-medium

                  tracking-[0.25em]

                  text-white/30

                "
              >
                SONIC PROFILE
              </div>

              <p
                className="

                  font-body

                  text-[13px]

                  leading-6

                  text-text-muted/80

                "
              >
                {selectedGenre.vibe}
              </p>
            </div>

            {/* signature */}

            <div
              className="

                relative

                z-10

                mt-5

                rounded-2xl

                sm:mt-6

                border border-white/[0.055]

                bg-white/[0.018]

                p-4

              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="

                    mt-0.5

                    flex

                    h-8

                    w-8

                    shrink-0

                    items-center

                    justify-center

                    rounded-lg

                    border border-primary/15

                    bg-primary/[0.06]

                  "
                >
                  <Headphones className="h-3.5 w-3.5 text-primary" />
                </div>

                <div>
                  <div
                    className="

                      font-tech

                      text-[7px]

                      tracking-[0.23em]

                      text-white/30

                    "
                  >
                    SIGNATURE PRAXX TRACKS
                  </div>

                  <div
                    className="

                      mt-1.5

                      font-tech

                      text-[10px]

                      font-medium

                      leading-5

                      text-orange-200/90

                    "
                  >
                    {selectedGenre.signature}
                  </div>
                </div>
              </div>
            </div>

            {/* genre navigation */}

            <div
              className="

                relative

                z-10

                mt-6

                grid

                sm:mt-7

                grid-cols-7

                gap-1.5

              "
            >
              {GENRES.map((genre) => {
                const active = genre.id === selectedGenre.id;

                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleSelectGenre(genre)}
                    title={genre.name}
                    className={`

                      relative h-1.5 overflow-hidden rounded-full

                      transition-all duration-500

                      ${
                        active
                          ? "bg-primary shadow-[0_0_9px_rgba(240,124,34,.65)]"
                          : "bg-white/[0.07] hover:bg-white/20"
                      }

                    `}
                  >
                    <span className="sr-only">{genre.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default SoundUniverseScene;
