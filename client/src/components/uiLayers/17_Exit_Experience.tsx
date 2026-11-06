import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import CTABtn from "../ui/btns/CTABtn";

interface ExitExperienceSceneProps {
  onNext: () => void;
}

/* ============================================================
   EXIT EXPERIENCE
============================================================ */

export const ExitExperienceScene: React.FC<ExitExperienceSceneProps> = ({
  onNext,
}) => {
  return (
    <section
      className="
        relative
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
      "
    >
      {/* ===================================================== */}
      {/* BACKGROUND                                            */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_44%,rgba(240,124,34,0.08),transparent_27%),radial-gradient(circle_at_50%_100%,rgba(240,124,34,0.06),transparent_42%)]
        "
      />

      {/* Top darkness */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(to_bottom,rgba(5,5,7,0.35),rgba(5,5,7,0.1)_45%,rgba(5,5,7,0.85))]
        "
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_65%,transparent)]
        "
      />

      {/* Center glow */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          h-[480px]
          w-[480px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.07]
          blur-[120px]
          sm:h-[600px]
          sm:w-[600px]
        "
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.65, 1, 0.65],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large halo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[640px]
          w-[640px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.025]
          sm:h-[780px]
          sm:w-[780px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[430px]
          w-[430px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-primary/[0.05]
          sm:h-[540px]
          sm:w-[540px]
        "
      />

      {/* Vertical beam */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-15%]
          h-[85%]
          w-[180px]
          -translate-x-1/2
          bg-[linear-gradient(to_bottom,transparent,rgba(240,124,34,0.025),transparent)]
          blur-3xl
        "
      />

      {/* ===================================================== */}
      {/* CONTENT                                               */}
      {/* ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
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
        <div className="w-full max-w-[900px]">
          {/* Eyebrow */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              mb-6
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-10
                bg-gradient-to-r
                from-transparent
                via-primary/40
                to-primary/70
                sm:w-16
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
                bg-primary/[0.04]
                px-3
                py-1.5
                backdrop-blur-xl
              "
            >
              <Sparkles
                className="
                  h-3
                  w-3
                  text-primary
                "
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
                Transmission fading
              </span>
            </div>

            <span
              className="
                h-px
                w-10
                bg-gradient-to-l
                from-transparent
                via-primary/40
                to-primary/70
                sm:w-16
              "
            />
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              y: 20,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              font-display
              text-[clamp(2.6rem,7vw,6.5rem)]
              font-semibold
              uppercase
              leading-[0.88]
              tracking-[-0.035em]
              text-white
            "
          >
            Until next
            <span
              className="
                relative
                ml-[0.22em]
                inline-block
                bg-gradient-to-b
                from-[#ff9c54]
                via-primary
                to-[#d95d08]
                bg-clip-text
                text-transparent
              "
            >
              night.
            </span>
          </motion.h1>

          {/* Mini tagline */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-3
              font-tech
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-white/45
              sm:text-[10px]
              sm:tracking-[0.4em]
            "
          >
            <span>Same soul</span>

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-primary
                shadow-[0_0_12px_rgba(240,124,34,0.9)]
              "
            />

            <span>New stories</span>
          </motion.div>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.55,
            }}
            className="
              mx-auto
              mt-7
              max-w-[620px]
              font-body
              text-[13px]
              leading-7
              text-white/40
              sm:text-[14px]
              sm:leading-7
            "
          >
            The final spotlight may fade, but the frequency remains. Carry the
            energy forward. We&apos;ll meet again when the next night comes
            alive.
          </motion.p>
        </div>

        <CTABtn onNext={onNext} text="view final screen" />

        {/* Bottom micro copy */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 1,
          }}
          className="
            mt-7
            font-tech
            text-[7px]
            uppercase
            tracking-[0.34em]
            text-white/20
          "
        >
          End of transmission
        </motion.div>
      </motion.div>

      {/* ===================================================== */}
      {/* ORANGE HORIZON                                       */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-190px]
          left-1/2
          h-[360px]
          w-[min(1100px,110vw)]
          -translate-x-1/2
          rounded-[50%]
          bg-primary/[0.08]
          blur-[100px]
        "
      />

      {/* ===================================================== */}
      {/* BOTTOM FADE                                          */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[5]
          h-[25%]
          bg-gradient-to-t
          from-[#050507]/80
          via-[#050507]/10
          to-transparent
        "
      />

      {/* ===================================================== */}
      {/* CINEMATIC VIGNETTE                                   */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          shadow-[inset_0_0_180px_80px_rgba(0,0,0,0.42)]
        "
      />
    </section>
  );
};
