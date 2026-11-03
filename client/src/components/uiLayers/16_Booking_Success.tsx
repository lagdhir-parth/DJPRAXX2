import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Radio,
  Sparkles,
} from "lucide-react";

interface BookingSuccessSceneProps {
  bookingData?: {
    name: string;
    eventType: string;
    date: string;
    venue: string;
  };
  onNext: () => void;
}

export const BookingSuccessScene: React.FC<BookingSuccessSceneProps> = ({
  bookingData,
  onNext,
}) => {
  /* ---------------------------------------------------------------------- */
  /* Stable confirmation reference                                          */
  /* ---------------------------------------------------------------------- */

  /* const confirmationCode = useMemo(() => {
    const source = `${bookingData?.name || "PRAXX"}-${
      bookingData?.eventType || "EVENT"
    }-${bookingData?.date || "NIGHT"}`;

    let hash = 0;

    for (let i = 0; i < source.length; i++) {
      hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    }

    return `PRX-${String(hash % 10000).padStart(4, "0")}-NIGHT`;
  }, [bookingData]); */

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        relative
        min-h-[100dvh]
        w-full
        overflow-hidden
        px-4
        pt-[145px]
        pb-[110px]
        sm:px-6
        lg:px-8
      "
    >
      {/* ================================================================ */}
      {/* LOCAL ATMOSPHERE                                                 */}
      {/* ================================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          h-[620px]
          w-[620px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.055]
          blur-[160px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[49%]
          h-[340px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          bg-primary/[0.025]
          blur-[100px]
        "
      />

      {/* subtle vertical signal lines */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-[10%]
          top-[27%]
          h-[48%]
          opacity-[0.12]
        "
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 36px, rgba(240,124,34,0.18) 37px, transparent 38px)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />

      {/* ================================================================ */}
      {/* SCENE BADGE                                                      */}
      {/* ================================================================ */}

      <div className="relative z-10 mx-auto mb-8 flex max-w-[1500px] justify-center">
        <div
          className="
            inline-flex
            items-center
            gap-2.5
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.035]
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <span className="relative flex h-2 w-2">
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-primary
                opacity-50
              "
            />

            <span className="relative h-2 w-2 rounded-full bg-primary" />
          </span>

          <span
            className="
              font-tech
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-text-muted
            "
          >
            Scene 18
          </span>

          <span className="h-3 w-px bg-white/10" />

          <span
            className="
              font-tech
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-primary
            "
          >
            Booking Success
          </span>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                     */}
      {/* ================================================================ */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1500px]
          flex-col
          items-center
          text-center
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* REQUEST RECEIVED                                               */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-3 flex items-center gap-2">
          <Radio className="h-3 w-3 text-primary" />

          <span
            className="
              font-tech
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.42em]
              text-text-muted
            "
          >
            Request Received
          </span>
        </div>

        <h1
          className="
            font-display
            text-[30px]
            font-semibold
            uppercase
            leading-none
            tracking-[0.16em]
            text-white
            sm:text-[38px]
            lg:text-[44px]
          "
        >
          Signal
          <span className="ml-[0.22em] text-primary">Confirmed</span>
        </h1>

        {/* ================================================================ */}
        {/* SIGNAL VISUAL                                                    */}
        {/* ================================================================ */}

        <div
          className="
            relative
            mt-8
            flex
            h-[190px]
            w-full
            max-w-[1200px]
            items-center
            justify-center
            sm:h-[220px]
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* BASELINE                                                       */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              absolute
              left-[4%]
              right-[4%]
              top-1/2
              h-px
              -translate-y-1/2
              bg-gradient-to-r
              from-transparent
              via-primary/40
              to-transparent
            "
          />

          {/* -------------------------------------------------------------- */}
          {/* WAVE GLOW                                                      */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              pointer-events-none
              absolute
              left-[6%]
              right-[6%]
              top-1/2
              h-[70px]
              -translate-y-1/2
              bg-primary/[0.07]
              blur-[35px]
            "
          />

          {/* -------------------------------------------------------------- */}
          {/* SVG AUDIO WAVE                                                 */}
          {/* -------------------------------------------------------------- */}

          <svg
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="
              absolute
              left-0
              top-1/2
              h-[120px]
              w-full
              -translate-y-1/2
              overflow-visible
            "
          >
            <defs>
              <linearGradient id="signalGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f07c22" stopOpacity="0" />
                <stop offset="14%" stopColor="#f07c22" stopOpacity="0.35" />
                <stop offset="42%" stopColor="#ff9450" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#fff4ec" stopOpacity="1" />
                <stop offset="58%" stopColor="#ff9450" stopOpacity="0.95" />
                <stop offset="86%" stopColor="#f07c22" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f07c22" stopOpacity="0" />
              </linearGradient>

              <filter
                id="waveGlow"
                x="-30%"
                y="-100%"
                width="160%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="8" result="blur" />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="strongWaveGlow"
                x="-30%"
                y="-100%"
                width="160%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="15" result="blur" />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* soft duplicate */}
            <path
              d="
                M0 90
                L70 90
                L92 87
                L110 94
                L128 88
                L146 90
                L170 90
                L188 82
                L202 101
                L216 72
                L228 110
                L242 80
                L258 96
                L274 86
                L294 90
                L315 90
                L332 75
                L347 105
                L363 58
                L378 122
                L393 78
                L410 98
                L425 84
                L445 90
                L468 90
                L484 74
                L499 105
                L513 57
                L528 122
                L543 70
                L558 105
                L574 82
                L590 90
                L610 90
                L626 80
                L642 103
                L658 62
                L674 117
                L690 74
                L706 101
                L722 85
                L740 90
                L760 90
                L778 72
                L793 108
                L810 58
                L826 120
                L842 75
                L858 101
                L874 84
                L894 90
                L916 90
                L932 80
                L948 99
                L964 72
                L980 108
                L995 84
                L1012 95
                L1030 88
                L1054 90
                L1074 86
                L1093 94
                L1112 89
                L1134 90
                L1200 90
              "
              fill="none"
              stroke="#f07c22"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.18"
              filter="url(#strongWaveGlow)"
            />

            {/* primary waveform */}
            <path
              d="
                M0 90
                L70 90
                L92 87
                L110 94
                L128 88
                L146 90
                L170 90
                L188 82
                L202 101
                L216 72
                L228 110
                L242 80
                L258 96
                L274 86
                L294 90
                L315 90
                L332 75
                L347 105
                L363 58
                L378 122
                L393 78
                L410 98
                L425 84
                L445 90
                L468 90
                L484 74
                L499 105
                L513 57
                L528 122
                L543 70
                L558 105
                L574 82
                L590 90
                L610 90
                L626 80
                L642 103
                L658 62
                L674 117
                L690 74
                L706 101
                L722 85
                L740 90
                L760 90
                L778 72
                L793 108
                L810 58
                L826 120
                L842 75
                L858 101
                L874 84
                L894 90
                L916 90
                L932 80
                L948 99
                L964 72
                L980 108
                L995 84
                L1012 95
                L1030 88
                L1054 90
                L1074 86
                L1093 94
                L1112 89
                L1134 90
                L1200 90
              "
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#waveGlow)"
              className="prx-wave-main"
            />

            {/* moving energy pulse */}
            <path
              d="
                M0 90
                L70 90
                L92 87
                L110 94
                L128 88
                L146 90
                L170 90
                L188 82
                L202 101
                L216 72
                L228 110
                L242 80
                L258 96
                L274 86
                L294 90
                L315 90
                L332 75
                L347 105
                L363 58
                L378 122
                L393 78
                L410 98
                L425 84
                L445 90
                L468 90
                L484 74
                L499 105
                L513 57
                L528 122
                L543 70
                L558 105
                L574 82
                L590 90
                L610 90
                L626 80
                L642 103
                L658 62
                L674 117
                L690 74
                L706 101
                L722 85
                L740 90
                L760 90
                L778 72
                L793 108
                L810 58
                L826 120
                L842 75
                L858 101
                L874 84
                L894 90
                L916 90
                L932 80
                L948 99
                L964 72
                L980 108
                L995 84
                L1012 95
                L1030 88
                L1054 90
                L1074 86
                L1093 94
                L1112 89
                L1134 90
                L1200 90
              "
              fill="none"
              stroke="#fff4ec"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="60 1140"
              filter="url(#waveGlow)"
              className="prx-wave-pulse"
            />
          </svg>

          {/* ============================================================ */}
          {/* CENTRAL SIGNAL CORE                                          */}
          {/* ============================================================ */}

          <div
            className="
              relative
              z-20
              flex
              h-[118px]
              w-[118px]
              items-center
              justify-center
              sm:h-[136px]
              sm:w-[136px]
            "
          >
            {/* huge outer glow */}
            <div
              className="
                absolute
                inset-[-50px]
                rounded-full
                bg-primary/[0.08]
                blur-[35px]
                prx-core-breathe
              "
            />

            <div
              className="
                absolute
                inset-[-24px]
                rounded-full
                border
                border-primary/[0.08]
                prx-ring-outer
              "
            />

            <div
              className="
                absolute
                inset-[-12px]
                rounded-full
                border
                border-primary/15
                shadow-[0_0_45px_rgba(240,124,34,0.15)]
              "
            />

            {/* rotating ring */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                prx-ring-spin
              "
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 80deg, rgba(240,124,34,.75) 120deg, transparent 165deg, transparent 270deg, rgba(255,190,145,.85) 310deg, transparent 360deg)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* main circle */}
            <div
              className="
                relative
                flex
                h-[94px]
                w-[94px]
                items-center
                justify-center
                rounded-full

                border
                border-[#ffb47f]/80

                bg-[#0c0d10]

                shadow-[
                  0_0_10px_rgba(255,255,255,0.24),
                  0_0_20px_rgba(240,124,34,0.45),
                  0_0_48px_rgba(240,124,34,0.42),
                  0_0_90px_rgba(240,124,34,0.24),
                  inset_0_0_20px_rgba(240,124,34,0.08)
                ]

                sm:h-[108px]
                sm:w-[108px]
              "
            >
              {/* inner glass */}
              <div
                className="
                  absolute
                  inset-[5px]
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-gradient-to-b
                  from-white/[0.055]
                  to-transparent
                "
              />

              {/* hot glow */}
              <div
                className="
                  absolute
                  inset-[18px]
                  rounded-full
                  bg-primary/[0.14]
                  blur-[16px]
                "
              />

              <Check
                className="
                  relative
                  z-10
                  h-[37px]
                  w-[37px]
                  text-[#fff5ed]
                  drop-shadow-[0_0_9px_rgba(255,255,255,0.8)]
                  sm:h-[43px]
                  sm:w-[43px]
                "
                strokeWidth={1.8}
              />
            </div>

            {/* top highlight */}
            <div
              className="
                pointer-events-none
                absolute
                left-[32%]
                top-[11%]
                h-[14px]
                w-[34%]
                rotate-[-12deg]
                rounded-full
                bg-white/25
                blur-[9px]
              "
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* SIGNAL STATUS                                                    */}
        {/* ================================================================ */}

        <div className="-mt-2 flex items-center gap-3">
          <span
            className="
              h-px
              w-8
              bg-gradient-to-r
              from-transparent
              to-primary/60
            "
          />

          <span
            className="
              font-tech
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.42em]
              text-primary
            "
          >
            PRAXX Signal Active
          </span>

          <span
            className="
              h-px
              w-8
              bg-gradient-to-l
              from-transparent
              to-primary/60
            "
          />
        </div>

        {/* ================================================================ */}
        {/* MESSAGE                                                          */}
        {/* ================================================================ */}

        <div className="mt-8 max-w-[650px]">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-primary" />

            <span
              className="
                font-tech
                text-[8px]
                uppercase
                tracking-[0.32em]
                text-text-subtle
              "
            >
              Transmission Complete
            </span>
          </div>

          <h2
            className="
              font-display
              text-[19px]
              font-medium
              uppercase
              leading-[1.4]
              tracking-[0.12em]
              text-white
              sm:text-[22px]
            "
          >
            We&apos;ll take it from here.
            <span className="block text-text-muted">
              Thank you
              {bookingData?.name ? `, ${bookingData.name.split(" ")[0]}.` : "."}
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-[570px]
              font-body
              text-[12px]
              leading-6
              text-text-subtle
              sm:text-[13px]
            "
          >
            Your request for{" "}
            <span className="text-text-muted">
              {bookingData?.eventType || "your event"}
            </span>{" "}
            has entered the PRAXX booking system. Our team will review the
            details and connect with you shortly.
          </p>
        </div>

        {/* ================================================================ */}
        {/* EVENT SUMMARY                                                    */}
        {/* ================================================================ */}

        {(bookingData?.date || bookingData?.venue) && (
          <div
            className="
              mt-7
              flex
              max-w-[680px]
              flex-wrap
              items-center
              justify-center
              gap-x-7
              gap-y-3

              rounded-2xl
              border
              border-white/[0.07]

              bg-white/[0.025]

              px-5
              py-3.5

              backdrop-blur-xl
            "
          >
            {bookingData?.date && (
              <div className="flex items-center gap-2.5">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />

                <div className="text-left">
                  <span
                    className="
                      block
                      font-tech
                      text-[7px]
                      uppercase
                      tracking-[0.2em]
                      text-text-subtle
                    "
                  >
                    Event Date
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      font-body
                      text-[11px]
                      text-text-muted
                    "
                  >
                    {bookingData.date}
                  </span>
                </div>
              </div>
            )}

            {bookingData?.date && bookingData?.venue && (
              <div className="hidden h-7 w-px bg-white/[0.08] sm:block" />
            )}

            {bookingData?.venue && (
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />

                <div className="text-left">
                  <span
                    className="
                      block
                      font-tech
                      text-[7px]
                      uppercase
                      tracking-[0.2em]
                      text-text-subtle
                    "
                  >
                    Location
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      max-w-[220px]
                      truncate
                      font-body
                      text-[11px]
                      text-text-muted
                    "
                  >
                    {bookingData.venue}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* NEXT BUTTON                                                      */}
        {/* ================================================================ */}

        <button
          type="button"
          onClick={onNext}
          className="
            group
            relative
            mt-8
            flex
            h-[54px]
            min-w-[285px]
            items-center
            justify-center
            overflow-hidden

            rounded-full
            border
            border-primary/60

            bg-primary

            px-8

            font-tech
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]

            text-black

            shadow-[
              0_12px_35px_rgba(240,124,34,0.20),
              0_0_45px_rgba(240,124,34,0.10)
            ]

            transition-all
            duration-300

            hover:-translate-y-[2px]
            hover:bg-[#ff8c38]
            hover:shadow-[
              0_18px_50px_rgba(240,124,34,0.32),
              0_0_65px_rgba(240,124,34,0.16)
            ]

            active:translate-y-0
            active:scale-[0.985]
          "
        >
          {/* moving highlight */}
          <span
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-[-30%]
              w-[18%]
              skew-x-[-18deg]
              bg-white/25
              blur-sm
              transition-all
              duration-700
              group-hover:left-[120%]
            "
          />

          <span className="relative flex items-center gap-3">
            Enter Exit Experience
            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-1.5
              "
            />
          </span>
        </button>
      </div>

      {/* ================================================================ */}
      {/* LOCAL ANIMATION DEFINITIONS                                      */}
      {/* ================================================================ */}

      <style>{`
        @keyframes prxCoreBreathe {
          0%, 100% {
            opacity: 0.55;
            transform: scale(0.92);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes prxOuterRing {
          0% {
            opacity: 0.5;
            transform: scale(0.88);
          }

          75%, 100% {
            opacity: 0;
            transform: scale(1.45);
          }
        }

        @keyframes prxRingSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes prxWavePulse {
          from {
            stroke-dashoffset: 1260;
          }

          to {
            stroke-dashoffset: -1260;
          }
        }

        @keyframes prxWaveBreathing {
          0%, 100% {
            opacity: 0.72;
          }

          50% {
            opacity: 1;
          }
        }

        .prx-core-breathe {
          animation: prxCoreBreathe 2.8s ease-in-out infinite;
        }

        .prx-ring-outer {
          animation: prxOuterRing 2.5s ease-out infinite;
        }

        .prx-ring-spin {
          animation: prxRingSpin 9s linear infinite;
        }

        .prx-wave-main {
          animation: prxWaveBreathing 2.2s ease-in-out infinite;
        }

        .prx-wave-pulse {
          animation: prxWavePulse 3.2s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .prx-core-breathe,
          .prx-ring-outer,
          .prx-ring-spin,
          .prx-wave-main,
          .prx-wave-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};
