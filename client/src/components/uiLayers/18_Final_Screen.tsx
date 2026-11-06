import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Headphones,
  MessageCircle,
  Play,
  Radio,
  RotateCcw,
  Signal,
  Volume2,
} from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { HowlerEngine } from "../../audio/howlerEngine";

interface FinalScreenSceneProps {
  onReplay: () => void;
}

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "SoundCloud",
    href: "https://soundcloud.com",
    icon: Radio,
  },
  {
    name: "Spotify",
    href: "https://spotify.com",
    icon: Headphones,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com",
    icon: MessageCircle,
  },
];

/* -------------------------------------------------------------------------- */
/*                               Signal Display                               */
/* -------------------------------------------------------------------------- */

const SignalBars = ({ reduced }: { reduced: boolean }) => {
  const bars = [12, 21, 29, 18, 34, 25, 17, 31, 23, 13];

  return (
    <div className="flex h-9 items-end gap-[3px]" aria-hidden="true">
      {bars.map((height, index) => (
        <motion.span
          key={index}
          className="w-[3px] rounded-full bg-primary"
          initial={{ height: 5 }}
          animate={
            reduced
              ? { height }
              : {
                  height: [
                    Math.max(5, height * 0.35),
                    height,
                    Math.max(6, height * 0.55),
                    height * 0.8,
                  ],
                }
          }
          transition={{
            duration: 1.1 + (index % 3) * 0.18,
            repeat: reduced ? 0 : Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: index * 0.04,
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Studio Console                               */
/* -------------------------------------------------------------------------- */

const StudioConsole = ({ reduced }: { reduced: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative mx-auto w-full max-w-[620px]
        xl:mx-0 xl:max-w-none
      "
    >
      {/* soft environmental light */}
      <div
        className="
          pointer-events-none absolute left-[10%] top-[8%]
          h-[70%] w-[70%] rounded-full
          bg-primary/[0.08] blur-[100px]
        "
      />

      {/* console body */}
      <div
        className="
          relative overflow-hidden rounded-[28px]
          border border-white/[0.09]
          bg-gradient-to-br
          from-[#19191b]
          via-[#0d0d0f]
          to-[#060607]
          p-3
          shadow-[0_45px_120px_rgba(0,0,0,0.72)]
          sm:rounded-[34px] sm:p-4
        "
      >
        {/* metal top highlight */}
        <div
          className="
            pointer-events-none absolute inset-x-10 top-0
            h-px
            bg-gradient-to-r
            from-transparent via-white/35 to-transparent
          "
        />

        {/* inner panel */}
        <div
          className="
            relative overflow-hidden rounded-[22px]
            border border-white/[0.06]
            bg-[#09090a]
            px-5 py-6
            sm:rounded-[27px]
            sm:px-7 sm:py-8
            lg:px-8
          "
        >
          {/* header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  font-tech text-[8px] font-semibold
                  tracking-[0.3em] text-white/35 uppercase
                "
              >
                PRAXX Audio System
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="
                    h-1.5 w-1.5 rounded-full bg-primary
                    shadow-[0_0_10px_rgba(240,124,34,0.9)]
                  "
                />

                <span
                  className="
                    font-tech text-[9px]
                    tracking-[0.18em] text-white/60 uppercase
                  "
                >
                  Signal Active
                </span>
              </div>
            </div>

            <Signal className="h-5 w-5 text-primary/80" />
          </div>

          {/* radio display */}
          <div
            className="
              relative mt-6 overflow-hidden rounded-[18px]
              border border-[#fb923c]/20
              bg-[#080604]
              px-5 py-5
              shadow-[inset_0_0_40px_rgba(240,124,34,0.055)]
              sm:px-6 sm:py-6
            "
          >
            <div
              className="
                pointer-events-none absolute inset-0
                opacity-[0.12]
                [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)]
                [background-size:100%_4px]
              "
            />

            <div className="relative flex items-end justify-between gap-5">
              <div>
                <span
                  className="
                    font-tech text-[8px] font-semibold
                    tracking-[0.28em] text-primary/60 uppercase
                  "
                >
                  Night Frequency
                </span>

                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className="
                      font-mono text-[clamp(42px,12vw,76px)]
                      font-light leading-none
                      tracking-[-0.07em] text-[#ff9b4a]
                      drop-shadow-[0_0_16px_rgba(240,124,34,0.35)]
                    "
                  >
                    104.7
                  </span>

                  <span
                    className="
                      mb-1 font-tech text-[9px]
                      tracking-[0.22em]
                      text-primary/45 uppercase
                    "
                  >
                    FM
                  </span>
                </div>
              </div>

              <div className="hidden sm:block">
                <SignalBars reduced={reduced} />
              </div>
            </div>

            <div
              className="
                relative mt-5 flex items-center
                justify-between border-t
                border-primary/[0.12] pt-4
              "
            >
              <span
                className="
                  font-tech text-[8px]
                  tracking-[0.22em]
                  text-white/32 uppercase
                "
              >
                Current Transmission
              </span>

              <span
                className="
                  font-tech text-[8px]
                  tracking-[0.18em]
                  text-white/65 uppercase
                "
              >
                Still Playing
              </span>
            </div>
          </div>

          {/* hardware row */}
          <div className="mt-7 grid grid-cols-[1fr_auto] items-center gap-5">
            {/* speaker */}
            <div
              className="
                relative h-[105px] overflow-hidden
                rounded-[18px]
                border border-white/[0.06]
                bg-[#070708]
                sm:h-[122px]
              "
            >
              <div
                className="
                  absolute inset-0 opacity-40
                  [background-image:radial-gradient(circle,rgba(255,255,255,.16)_1px,transparent_1.4px)]
                  [background-size:7px_7px]
                "
              />

              <div
                className="
                  absolute inset-y-0 left-0 w-1/2
                  bg-gradient-to-r
                  from-primary/[0.035]
                  to-transparent
                "
              />

              <div className="relative flex h-full items-center px-5">
                <div>
                  <Volume2 className="h-4 w-4 text-white/35" />

                  <span
                    className="
                      mt-3 block font-tech text-[8px]
                      tracking-[0.24em]
                      text-white/25 uppercase
                    "
                  >
                    Analog Output
                  </span>
                </div>
              </div>
            </div>

            {/* volume knob */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={
                  reduced
                    ? undefined
                    : {
                        rotate: [0, 3, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative flex h-[86px] w-[86px]
                  items-center justify-center
                  rounded-full border
                  border-white/[0.09]
                  bg-gradient-to-br
                  from-[#29292c]
                  via-[#111113]
                  to-[#050506]
                  shadow-[0_14px_35px_rgba(0,0,0,0.65)]
                  sm:h-[96px] sm:w-[96px]
                "
              >
                <div
                  className="
                    h-[64%] w-[64%] rounded-full
                    border border-white/[0.06]
                    bg-gradient-to-br
                    from-[#242426]
                    to-[#09090a]
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.06)]
                  "
                />

                <span
                  className="
                    absolute left-1/2 top-[11px]
                    h-3 w-[2px]
                    -translate-x-1/2
                    rounded-full bg-primary
                  "
                />
              </motion.div>

              <span
                className="
                  font-tech text-[7px]
                  tracking-[0.25em]
                  text-white/25 uppercase
                "
              >
                Level
              </span>
            </div>
          </div>

          {/* bottom hardware details */}
          <div
            className="
              mt-7 flex items-center
              justify-between border-t
              border-white/[0.05] pt-5
            "
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className={`
                    h-2 w-2 rounded-full
                    ${
                      item === 0
                        ? "bg-primary shadow-[0_0_8px_rgba(240,124,34,.8)]"
                        : "bg-white/10"
                    }
                  `}
                />
              ))}
            </div>

            <span
              className="
                font-tech text-[7px]
                tracking-[0.26em]
                text-white/20 uppercase
              "
            >
              PRX / 20
            </span>
          </div>
        </div>
      </div>

      {/* physical shadow */}
      <div
        className="
          pointer-events-none absolute
          -bottom-8 left-[12%]
          h-14 w-[76%]
          rounded-[100%]
          bg-black/70 blur-[25px]
        "
      />
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 Social Link                                */
/* -------------------------------------------------------------------------- */

const SocialLink = ({
  name,
  href,
  icon: Icon,
}: {
  name: string;
  href: string;
  icon: React.ElementType;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.96 }}
    aria-label={name}
    className="
      group flex h-11 w-11 items-center justify-center
      rounded-full border border-white/[0.08]
      bg-white/[0.035]
      text-white/45
      backdrop-blur-md
      transition-all duration-300
      hover:border-primary/35
      hover:bg-primary/[0.08]
      hover:text-primary
      sm:h-auto sm:w-auto
      sm:gap-2.5 sm:px-4 sm:py-3
    "
  >
    <Icon className="h-4 w-4 shrink-0" />

    <span
      className="
        hidden font-tech text-[8px]
        font-semibold tracking-[0.17em]
        uppercase sm:block
      "
    >
      {name}
    </span>

    <ArrowUpRight
      className="
        hidden h-3 w-3
        opacity-0 transition-opacity
        group-hover:opacity-100 lg:block
      "
    />
  </motion.a>
);

/* -------------------------------------------------------------------------- */
/*                              FinalScreenScene                              */
/* -------------------------------------------------------------------------- */

export const FinalScreenScene: React.FC<FinalScreenSceneProps> = ({
  onReplay,
}) => {
  const reducedMotion = useReducedMotion();

  const handleReplayClick = () => {
    HowlerEngine.triggerLightPulseSound();
    onReplay();
  };

  return (
    <section
      className="
        relative min-h-svh w-full
        overflow-visible 
        text-white 
        backdrop-blur-xs
      "
    >
      {/* ================================================================== */}
      {/* BACKGROUND                                                         */}
      {/* ================================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* warm studio lamp */}
        <div
          className="
            absolute -left-[8%] top-[8%]
            h-[60%] w-[48%]
            rounded-full
            bg-primary/[0.055]
            blur-[120px]
          "
        />

        {/* distant cold light */}
        <div
          className="
            absolute right-[-10%] top-[15%]
            h-[45%] w-[35%]
            rounded-full
            bg-blue-500/[0.025]
            blur-[130px]
          "
        />

        {/* floor glow */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-[32%]
            bg-gradient-to-t
            from-black/70 to-transparent
          "
        />

        {/* subtle grain-ish pattern */}
        <div
          className="
            absolute inset-0
            opacity-[0.025]
            [background-image:radial-gradient(rgba(255,255,255,.55)_0.45px,transparent_0.7px)]
            [background-size:5px_5px]
          "
        />

        {/* vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,.64)_100%)]
          "
        />
      </div>

      {/* ================================================================== */}
      {/* MAIN                                                               */}
      {/* ================================================================== */}

      <div
        className="
          relative z-10 mx-auto
          flex min-h-[100svh]
          w-full max-w-[1720px]
          items-center
          px-4 pb-16 pt-12
          sm:px-8 sm:pb-20 sm:pt-[100px]
          lg:px-12
          xl:px-[clamp(60px,6vw,105px)]
        "
      >
        <div
          className="
            grid w-full
            items-center gap-14
            xl:grid-cols-[minmax(480px,0.98fr)_minmax(480px,0.92fr)]
            xl:gap-[clamp(60px,7vw,120px)]
          "
        >
          {/* ============================================================ */}
          {/* RADIO                                                        */}
          {/* ============================================================ */}

          <div className="order-2 xl:order-1">
            <StudioConsole reduced={!!reducedMotion} />
          </div>

          {/* ============================================================ */}
          {/* CONTENT                                                      */}
          {/* ============================================================ */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              order-1 mx-auto flex
              w-full max-w-[680px]
              flex-col items-center
              text-center
              xl:order-2
              xl:mx-0
              xl:items-start
              xl:text-left
            "
          >
            {/* title */}
            <h1
              className="
                mt-7 font-display
                text-[clamp(58px,16vw,94px)]
                font-black uppercase
                leading-[0.82]
                tracking-[-0.065em]
                sm:text-[clamp(72px,12vw,108px)]
                xl:text-[clamp(88px,7.1vw,126px)]
              "
            >
              <span className="block text-white">Stay</span>

              <span
                className="
                  block bg-gradient-to-r
                  from-[#ffad68]
                  via-primary
                  to-[#e95208]
                  bg-clip-text
                  text-transparent
                "
              >
                Tuned.
              </span>
            </h1>

            {/* copy */}
            <div
              className="
                mt-7 max-w-[570px]
                border-l-0 border-primary/60
                xl:border-l-2 xl:pl-6
              "
            >
              <p
                className="
                  text-[15px] leading-7
                  text-white/52
                  sm:text-[16px]
                  sm:leading-8
                "
              >
                Music never really ends. The frequency changes, the room gets
                quieter, and another story begins.
              </p>

              <p
                className="
                  mt-4 font-display
                  text-[19px] font-medium
                  tracking-[0.025em]
                  text-white/90
                  sm:text-[21px]
                "
              >
                Still listening.
                <span className="text-primary"> Still learning.</span> Still
                playing.
              </p>
            </div>

            {/* location/status */}
            <div
              className="
                mt-7 flex flex-wrap
                items-center justify-center
                gap-x-3 gap-y-2
                xl:justify-start
              "
            >
              {["Rajkot", "Gujarat", "India"].map((item, index) => (
                <React.Fragment key={item}>
                  <span
                    className="
                        font-tech text-[8px]
                        font-semibold
                        tracking-[0.28em]
                        text-white/28 uppercase
                      "
                  >
                    {item}
                  </span>

                  {index < 2 && (
                    <span
                      className="
                          h-1 w-1
                          rounded-full bg-primary/55
                        "
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* replay */}
            <motion.button
              type="button"
              onClick={handleReplayClick}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              whileTap={{ scale: 0.985 }}
              className="
                group relative mt-9
                flex h-[62px]
                w-full max-w-[520px]
                items-center justify-between
                overflow-hidden
                rounded-[17px]
                border border-[#ffad76]/50
                bg-gradient-to-r
                from-[#ea5b0c]
                via-primary
                to-[#ff8b32]
                px-5
                shadow-[0_18px_50px_rgba(240,124,34,0.16)]
                transition-shadow
                hover:shadow-[0_20px_60px_rgba(240,124,34,0.25)]
                sm:h-[66px] sm:px-6
              "
            >
              {/* shine */}
              <span
                className="
                  pointer-events-none absolute
                  inset-y-0 left-[-40%]
                  w-[28%] -skew-x-[22deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/25
                  to-transparent
                  transition-[left]
                  duration-700
                  group-hover:left-[120%]
                "
              />

              <span className="relative z-10 flex items-center gap-3">
                <RotateCcw
                  className="
                    h-[17px] w-[17px]
                    transition-transform
                    duration-500
                    group-hover:-rotate-90
                  "
                />

                <span
                  className="
                    font-tech text-[9px]
                    font-bold tracking-[0.24em]
                    uppercase sm:text-[10px]
                  "
                >
                  Replay Night Journey
                </span>
              </span>

              <span
                className="
                  relative z-10 flex
                  h-9 w-9 items-center
                  justify-center rounded-full
                  border border-white/20
                  bg-black/15
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                <Play className="ml-0.5 h-3.5 w-3.5 fill-white" />
              </span>
            </motion.button>

            {/* social */}
            <div className="mt-8 w-full">
              <div
                className="
                  flex items-center
                  justify-center gap-4
                  xl:justify-start
                "
              >
                <span
                  className="
                    font-tech text-[8px]
                    font-semibold
                    tracking-[0.25em]
                    text-white/25 uppercase
                  "
                >
                  Continue listening
                </span>

                <span
                  className="
                    h-px flex-1
                    bg-gradient-to-r
                    from-white/[0.08]
                    to-transparent
                  "
                />
              </div>

              <div
                className="
                  mt-4 flex flex-wrap
                  justify-center gap-2
                  xl:justify-start
                "
              >
                {socials.map((social) => (
                  <SocialLink key={social.name} {...social} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* top light edge */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.12]
          to-transparent
        "
      />

      {/* bottom orange signature */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 0.55,
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute bottom-0 left-0
          h-px w-full origin-center
          bg-gradient-to-r
          from-transparent
          via-primary/60
          to-transparent
        "
      />
    </section>
  );
};

export default FinalScreenScene;
