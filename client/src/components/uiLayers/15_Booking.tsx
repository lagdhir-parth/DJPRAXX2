import React, { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { HowlerEngine } from "../../audio/howlerEngine";

interface BookingSceneProps {
  onSuccess: (bookingData: {
    name: string;
    eventType: string;
    date: string;
    venue: string;
  }) => void;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  venue: string;
  message: string;
}

/* -------------------------------------------------------------------------- */
/*                                  API                                       */
/* -------------------------------------------------------------------------- */

/**
 * Add this to your .env:
 *
 * VITE_BOOKING_API_URL=https://your-domain.com/api/bookings
 */
// const BOOKING_API_ENDPOINT =
//   import.meta.env.VITE_BOOKING_API_URL ||
//   "https://your-api-endpoint.com/api/bookings";

/* -------------------------------------------------------------------------- */
/*                              FIELD WRAPPER                                 */
/* -------------------------------------------------------------------------- */

interface FieldShellProps {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}

const BOOKING_API_ENDPOINT = import.meta.env.VITE_BOOKING_API_URL;

const FieldShell: React.FC<FieldShellProps> = ({
  label,
  icon,
  required,
  children,
}) => {
  return (
    <div className="group min-w-0">
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          font-tech
          text-[9px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-text-subtle
          transition-colors
          duration-300
          group-focus-within:text-primary
        "
      >
        <span
          className="
            text-text-subtle
            transition-colors
            duration-300
            group-focus-within:text-primary
          "
        >
          {icon}
        </span>

        <span>{label}</span>

        {required && <span className="text-primary">*</span>}
      </label>

      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              BOOKING SCENE                                 */
/* -------------------------------------------------------------------------- */

export const BookingScene: React.FC<BookingSceneProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    date: "",
    venue: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errorMsg) {
      setErrorMsg("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      setErrorMsg("Please provide your name, phone number and event date.");
      return;
    }

    setErrorMsg("");
    setSubmitted(false);
    setIsSubmitting(true);

    HowlerEngine.triggerLightPulseSound();

    try {
      if (!BOOKING_API_ENDPOINT) {
        throw new Error("Booking API is not configured");
      }

      const body = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        date: formData.date,
        venue: formData.venue,
        message: formData.message,
      });

      await fetch(BOOKING_API_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      // A no-cors response is opaque.
      // This does NOT confirm that the Sheet saved the request.
      // Keep the booking in a submission-unverified state
      // until it is checked in Google Sheets.

      setSubmitted(true);

      onSuccess({
        name: formData.name,
        eventType: formData.eventType,
        date: formData.date,
        venue: formData.venue || "Venue not specified",
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      setErrorMsg("We couldn't send your booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `
    h-[48px]
    w-full
    min-w-0
    rounded-[12px]
    border
    border-white/[0.08]
    bg-white/[0.035]
    px-4
    font-body
    text-[12px]
    text-text
    outline-none
    transition-all
    duration-300
    placeholder:text-white/25
    hover:border-white/[0.14]
    hover:bg-white/[0.045]
    focus:border-primary/60
    focus:bg-white/[0.055]
    focus:shadow-[0_0_0_3px_rgba(240,124,34,0.07),0_0_28px_rgba(240,124,34,0.07)]
  `;

  return (
    <section
      className="
        relative
        w-full
        min-h-[100dvh]
        overflow-visible

        px-3
        pt-16
        pb-16

        sm:px-6
        sm:pt-20

        lg:px-8
        lg:pt-[120px]
        lg:pb-[80px]

        xl:px-10
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* SUBTLE LOCAL GLOW                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-[46%]
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.035]
          blur-[140px]
        "
      />

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CARD                                                          */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1550px]
          overflow-hidden

          rounded-[28px]
          border
          border-white/[0.07]

          bg-[#08090d]/70

          shadow-[0_30px_100px_rgba(0,0,0,0.45)]

          backdrop-blur-xl

          lg:grid-cols-[0.88fr_1.12fr]
        "
      >
        {/* ================================================================= */}
        {/* LEFT PANEL                                                        */}
        {/* ================================================================= */}

        <div
          className="
            relative
            flex
            min-w-0
            flex-col
            justify-between
            overflow-hidden

            border-b
            border-white/[0.07]

            p-7

            sm:p-9

            lg:min-h-[615px]
            lg:border-b-0
            lg:border-r
            lg:p-10

            xl:p-12
          "
        >
          {/* edge glow */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-1px]
              top-[9%]
              h-[72%]
              w-px
              bg-gradient-to-b
              from-transparent
              via-primary/45
              to-transparent
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-40
              top-10
              h-[420px]
              w-[420px]
              rounded-full
              bg-primary/[0.055]
              blur-[120px]
            "
          />

          {/* -------------------------------------------------------------- */}
          {/* TOP LEFT                                                       */}
          {/* -------------------------------------------------------------- */}

          <div className="relative z-10 min-w-0">
            {/* PRAXX */}

            <div className="mb-9">
              <div
                className="
                  mb-2
                  font-display
                  text-[15px]
                  font-medium
                  uppercase
                  tracking-[0.52em]
                  text-white/40
                "
              >
                Book
              </div>

              <div
                className="
                  whitespace-nowrap
                  font-display
                  text-[36px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.34em]
                  text-white

                  sm:text-[42px]

                  lg:text-[44px]
                "
              >
                PRAX<span className="text-primary">X</span>
              </div>
            </div>

            {/* Heading */}

            <div className="max-w-[590px]">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" />

                <span
                  className="
                    font-tech
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-primary
                  "
                >
                  Your night. Your energy.
                </span>
              </div>

              <h1
                className="
                  max-w-full
                  font-display
                  font-semibold
                  uppercase
                  text-white

                  text-[clamp(2.35rem,4vw,4rem)]
                  leading-[0.98]
                  tracking-[-0.045em]
                "
              >
                <span className="block whitespace-nowrap">
                  Let&apos;s create
                </span>

                <span className="block text-[#cbd5e1]">something</span>

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-primary
                    via-[#ff9b5e]
                    to-[#ff7a1a]
                    bg-clip-text
                    pb-[5px]
                    text-transparent
                  "
                >
                  unforgettable
                </span>
              </h1>

              <p
                className="
                  mt-6
                  max-w-[500px]
                  font-body
                  text-[13px]
                  leading-6
                  text-text-subtle

                  lg:text-[14px]
                "
              >
                Tell us where the night is happening. We&apos;ll bring the
                sound, energy and atmosphere that turns the moment into a
                memory.
              </p>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* LEFT FOOTER                                                    */}
          {/* -------------------------------------------------------------- */}

          <div className="relative z-10 mt-12 lg:mt-8">
            <div
              className="
                mb-7
                h-px
                w-full
                bg-gradient-to-r
                from-white/20
                via-white/[0.05]
                to-transparent
              "
            />

            <div className="flex items-end justify-between gap-5">
              <div>
                <span
                  className="
                    font-tech
                    text-[8px]
                    uppercase
                    tracking-[0.28em]
                    text-white/25
                  "
                >
                  The PRAXX Philosophy
                </span>

                <p
                  className="
                    mt-2
                    font-display
                    text-[13px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-white/65
                  "
                >
                  Good events.
                  <br />
                  <span className="text-primary">Better memories.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT PANEL                                                       */}
        {/* ================================================================= */}

        <div
          className="
            relative
            flex
            min-w-0
            items-center

            bg-[#090a0f]/80

            p-6

            sm:p-8

            lg:p-9

            xl:px-12
            xl:py-10
          "
        >
          <div className="mx-auto w-full max-w-[720px]">
            {/* ------------------------------------------------------------ */}
            {/* HEADER                                                       */}
            {/* ------------------------------------------------------------ */}

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />

                <span
                  className="
                    font-tech
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.28em]
                    text-primary
                  "
                >
                  Booking Request
                </span>
              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <h2
                    className="
                      font-display
                      text-[26px]
                      font-semibold
                      leading-tight
                      tracking-[-0.025em]
                      text-text

                      lg:text-[30px]
                    "
                  >
                    Reserve your date.
                  </h2>

                  <p
                    className="
                      mt-1.5
                      font-body
                      text-[12px]
                      text-text-subtle
                    "
                  >
                    Share the details and our team will get back to you.
                  </p>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* ALERTS                                                       */}
            {/* ------------------------------------------------------------ */}

            {errorMsg && (
              <div
                className="
                  mb-4
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/[0.06]
                  px-4
                  py-3
                  font-body
                  text-[11px]
                  text-red-300
                "
              >
                {errorMsg}
              </div>
            )}

            {submitted && !errorMsg && (
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/[0.06]
                  px-4
                  py-3
                "
              >
                <CheckCircle2
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-emerald-400
                  "
                />

                <span
                  className="
                    font-body
                    text-[11px]
                    text-emerald-200
                  "
                >
                  Your booking request has been sent. Our team will contact you
                  after reviewing it.
                </span>
              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* FORM                                                         */}
            {/* ------------------------------------------------------------ */}

            <form
              onSubmit={handleSubmit}
              autoComplete="on"
              className="space-y-4"
            >
              {/* Row 1 */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2
                "
              >
                <FieldShell
                  label="Your Name"
                  required
                  icon={<UserRound className="h-3 w-3" />}
                >
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={inputClass}
                  />
                </FieldShell>

                <FieldShell
                  label="Email Address"
                  icon={<Mail className="h-3 w-3" />}
                >
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass}
                  />
                </FieldShell>
              </div>

              {/* Row 2 */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2
                "
              >
                <FieldShell
                  label="Phone Number"
                  required
                  icon={<Phone className="h-3 w-3" />}
                >
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClass}
                  />
                </FieldShell>

                <FieldShell
                  label="Event Type"
                  icon={<Sparkles className="h-3 w-3" />}
                >
                  <div className="relative">
                    <select
                      value={formData.eventType}
                      onChange={(e) => updateField("eventType", e.target.value)}
                      className={`
      ${inputClass}
      cursor-pointer
      appearance-none
      pr-11
    `}
                    >
                      <option
                        value="Wedding"
                        className="bg-[#0c0d12] text-white"
                      >
                        Wedding Celebration
                      </option>

                      <option
                        value="Sangeet"
                        className="bg-[#0c0d12] text-white"
                      >
                        Sangeet / Reception
                      </option>

                      <option value="Club" className="bg-[#0c0d12] text-white">
                        Club Night / Rave
                      </option>

                      <option
                        value="Festival"
                        className="bg-[#0c0d12] text-white"
                      >
                        Music Festival
                      </option>

                      <option
                        value="Private"
                        className="bg-[#0c0d12] text-white"
                      >
                        Private Gala
                      </option>

                      <option
                        value="Corporate"
                        className="bg-[#0c0d12] text-white"
                      >
                        Corporate Event
                      </option>
                    </select>

                    <ChevronDown
                      className="
      pointer-events-none
      absolute
      right-4
      top-1/2
      h-3.5
      w-3.5
      -translate-y-1/2
      text-text-subtle
    "
                    />
                  </div>
                </FieldShell>
              </div>

              {/* Row 3 */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2
                "
              >
                <FieldShell
                  label="Event Date"
                  icon={<CalendarDays className="h-3 w-3" />}
                >
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FieldShell>

                <FieldShell
                  label="Venue / Location"
                  icon={<MapPin className="h-3 w-3" />}
                >
                  <input
                    type="text"
                    placeholder="Venue, city"
                    value={formData.venue}
                    onChange={(e) => updateField("venue", e.target.value)}
                    className={inputClass}
                  />
                </FieldShell>
              </div>

              {/* Message */}

              <FieldShell
                label="Message / Requirements"
                icon={<MessageSquare className="h-3 w-3" />}
              >
                <textarea
                  rows={3}
                  placeholder="Tell us about your event, crowd, music style or special requirements..."
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="
                    min-h-[94px]
                    w-full
                    resize-none

                    rounded-[12px]
                    border
                    border-white/[0.08]

                    bg-white/[0.035]

                    px-4
                    py-3.5

                    font-body
                    text-[12px]
                    leading-5
                    text-text

                    outline-none

                    transition-all
                    duration-300

                    placeholder:text-white/25

                    hover:border-white/[0.14]
                    hover:bg-white/[0.045]

                    focus:border-primary/60
                    focus:bg-white/[0.055]
                    focus:shadow-[0_0_0_3px_rgba(240,124,34,0.07),0_0_28px_rgba(240,124,34,0.07)]
                  "
                />
              </FieldShell>

              {/* Submit */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  relative
                  mt-1
                  flex
                  h-[54px]
                  w-full
                  items-center
                  justify-center
                  overflow-hidden

                  rounded-[12px]
                  border
                  border-primary/70

                  bg-primary

                  px-5

                  font-tech
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.27em]

                  text-black

                  shadow-[0_12px_35px_rgba(240,124,34,0.2),0_0_40px_rgba(240,124,34,0.08)]

                  transition-all
                  duration-300

                  hover:-translate-y-[1px]
                  hover:bg-[#ff8b35]
                  hover:shadow-[0_15px_45px_rgba(240,124,34,0.3),0_0_55px_rgba(240,124,34,0.12)]

                  active:translate-y-0
                  active:scale-[0.995]

                  disabled:pointer-events-none
                  disabled:opacity-60
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-[-30%]
                    w-[18%]
                    skew-x-[-20deg]
                    bg-white/20
                    blur-sm
                    transition-all
                    duration-700
                    group-hover:left-[120%]
                  "
                />

                <span
                  className="
                    relative
                    flex
                    items-center
                    gap-3
                  "
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="
                          h-3.5
                          w-3.5
                          animate-spin
                          rounded-full
                          border-2
                          border-black/30
                          border-t-black
                        "
                      />
                      Sending Request
                    </>
                  ) : (
                    <>
                      Send Booking Request
                      <Send
                        className="
                          h-3.5
                          w-3.5
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          group-hover:-translate-y-[1px]
                        "
                      />
                    </>
                  )}
                </span>
              </button>

              {/* form bottom */}

              <div
                className="
                  flex
                  flex-col
                  gap-2
                  pt-1

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    font-body
                    text-[9px]
                    text-white/25
                  "
                >
                  By submitting, you agree to be contacted about your event.
                </p>

                <span
                  className="
                    font-tech
                    text-[7px]
                    uppercase
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  PRAXX Booking System
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
