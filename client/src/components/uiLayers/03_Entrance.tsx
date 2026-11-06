import React from "react";
import { motion } from "framer-motion";
import { AudioLines, Radio, Sparkles, Volume2 } from "lucide-react";

import CTABtn from "../ui/btns/CTABtn";

interface EntranceSceneProps {
  onNext: () => void;
}

export const EntranceScene: React.FC<EntranceSceneProps> = ({ onNext }) => {
  return (
    <section
      className="
        absolute
        inset-0
        isolate
        flex
        min-h-[100dvh]
        w-full
        items-center
        justify-center
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        bg-black/30
        backdrop-blur-xs
        px-4
        pt-16
        pb-12
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
        z-30
      "
    >
      {/* ===================================================== */}
      {/* GRID                                                   */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.045]
          [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)]
          [background-size:70px_70px]
          [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_70%,transparent)]
        "
      />

      {/* ===================================================== */}
      {/* CENTER ORANGE LIGHT                                   */}
      {/* ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[51%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.09]
          blur-[110px]
          sm:h-[600px]
          sm:w-[600px]
        "
        animate={{
          opacity: [0.55, 0.95, 0.55],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ===================================================== */}
      {/* VERTICAL SPOTLIGHT                                    */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-20%]
          h-[90%]
          w-[220px]
          -translate-x-1/2
          bg-[linear-gradient(to_bottom,transparent,rgba(240,124,34,0.035),transparent)]
          blur-[45px]
        "
      />

      {/* ===================================================== */}
      {/* HALO RINGS                                            */}
      {/* ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[410px]
          w-[410px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-primary/[0.08]
          sm:h-[520px]
          sm:w-[520px]
        "
        animate={{
          scale: [0.98, 1.03, 0.98],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.025]
          sm:h-[760px]
          sm:w-[760px]
        "
      />

      {/* ===================================================== */}
      {/* SIDE LIGHT STREAKS                                    */}
      {/* ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-[47%]
          h-px
          w-[25vw]
          origin-right
          bg-gradient-to-l
          from-primary/30
          via-primary/10
          to-transparent
        "
        animate={{
          opacity: [0.15, 0.5, 0.15],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-[47%]
          h-px
          w-[25vw]
          origin-left
          bg-gradient-to-r
          from-primary/30
          via-primary/10
          to-transparent
        "
        animate={{
          opacity: [0.15, 0.5, 0.15],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.35,
        }}
      />

      {/* ===================================================== */}
      {/* MAIN CONTENT                                          */}
      {/* ===================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-[1500px]
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        {/* STATUS BADGE */}

        <motion.div
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="
            mb-8
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-8
              bg-gradient-to-r
              from-transparent
              to-primary/50
              sm:w-14
            "
          />

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/15
              bg-primary/[0.045]
              px-3.5
              py-2
              backdrop-blur-xl
            "
          >
            <motion.span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-primary
              "
              animate={{
                opacity: [0.35, 1, 0.35],
                boxShadow: [
                  "0 0 0 rgba(240,124,34,0)",
                  "0 0 14px rgba(240,124,34,0.9)",
                  "0 0 0 rgba(240,124,34,0)",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
            />

            <span
              className="
                font-tech
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-primary
                sm:text-[9px]
              "
            >
              Signal detected
            </span>
          </div>

          <span
            className="
              h-px
              w-8
              bg-gradient-to-l
              from-transparent
              to-primary/50
              sm:w-14
            "
          />
        </motion.div>

        {/* SMALL INTRO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.22,
          }}
          className="
            mb-4
            flex
            items-center
            justify-center
            gap-2.5
            font-tech
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.36em]
            text-white/35
            sm:text-[9px]
          "
        >
          <Sparkles className="h-3 w-3 text-primary/80" />

          <span>Private frequency established</span>
        </motion.div>

        {/* =================================================== */}
        {/* PRAXX LOGO / TITLE                                  */}
        {/* =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            filter: "blur(14px)",
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
          }}
          transition={{
            duration: 1.15,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <h1
            className="
              relative
              font-display
              text-[clamp(3.2rem,13vw,11rem)]
              font-semibold
              uppercase
              leading-[0.8]
              tracking-[-0.04em]
              text-white
            "
          >
            PRAXX
          </h1>

          {/* Orange underline/glow */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              -bottom-5
              left-1/2
              h-[2px]
              w-[55%]
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-primary
              to-transparent
            "
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.1,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              boxShadow:
                "0 0 18px rgba(240,124,34,0.6), 0 0 45px rgba(240,124,34,0.18)",
            }}
          />
        </motion.div>

        {/* =================================================== */}
        {/* MAIN MESSAGE                                        */}
        {/* =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-11
            max-w-[760px]
          "
        >
          <h2
            className="
              font-display
              text-[22px]
              font-medium
              uppercase
              leading-tight
              tracking-[0.12em]
              text-white/90
              sm:text-[28px]
              lg:text-[34px]
            "
          >
            Enter the
            <span
              className="
                ml-[0.28em]
                bg-gradient-to-b
                from-[#ffac6d]
                via-primary
                to-[#dd620d]
                bg-clip-text
                font-semibold
                text-transparent
              "
            >
              PRAXX event.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[580px]
              font-body
              text-[12px]
              leading-6
              text-white/35
              sm:text-[13px]
              sm:leading-7
            "
          >
            Step beyond the ordinary. Sound, motion and atmosphere converge
            inside a digital experience built for the night.
          </p>
        </motion.div>

        {/* =================================================== */}
        {/* EVENT META                                          */}
        {/* =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.95,
          }}
          className="
            mt-7
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              font-tech
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-white/25
              sm:text-[8px]
            "
          >
            <Radio className="h-3 w-3 text-primary/60" />
            Live frequency
          </div>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <div
            className="
              flex
              items-center
              gap-2
              font-tech
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-white/25
              sm:text-[8px]
            "
          >
            <AudioLines className="h-3 w-3 text-primary/60" />
            Immersive sound
          </div>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <div
            className="
              flex
              items-center
              gap-2
              font-tech
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-white/25
              sm:text-[8px]
            "
          >
            <Volume2 className="h-3 w-3 text-primary/60" />
            Headphones recommended
          </div>
        </motion.div>

        {/* =================================================== */}
        {/* CTA                                                 */}
        {/* =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10"
        >
          <CTABtn onNext={onNext} text="Start the experience" />
        </motion.div>

        {/* =================================================== */}
        {/* BOTTOM MICRO COPY                                   */}
        {/* =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1.3,
          }}
          className="
            mt-7
            font-tech
            text-[7px]
            uppercase
            tracking-[0.32em]
            text-white/15
          "
        >
          Your night begins beyond this point
        </motion.div>
      </div>

      {/* ===================================================== */}
      {/* FLOOR GLOW                                            */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-220px]
          left-1/2
          h-[420px]
          w-[min(1200px,115vw)]
          -translate-x-1/2
          rounded-[50%]
          bg-primary/[0.07]
          blur-[110px]
        "
      />

      {/* Thin horizon */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[8%]
          left-1/2
          h-px
          w-[70%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-primary/10
          to-transparent
        "
      />

      {/* ===================================================== */}
      {/* EDGE VIGNETTE                                         */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          shadow-[inset_0_0_180px_65px_rgba(0,0,0,0.55)]
        "
      />
    </section>
  );
};
