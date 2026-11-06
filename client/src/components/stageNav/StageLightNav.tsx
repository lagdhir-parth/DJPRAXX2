import React, { useCallback, useEffect, useState } from "react";
import { Menu, X, Radio } from "lucide-react";

import {
  NAV_ITEMS,
  type NavDestination,
  type NavItem,
} from "../../types/navigation";

import { HowlerEngine } from "../../audio/howlerEngine";

interface StageLightNavOverlayProps {
  activeNav: NavDestination;
  hoveredNav: NavDestination | null;
  focusedNav: NavDestination | null;
  onHoverNav: (dest: NavDestination | null) => void;
  onFocusNav: (dest: NavDestination | null) => void;
  onSelectNav: (dest: NavDestination) => void;
}

export const StageLightNav: React.FC<StageLightNavOverlayProps> = ({
  activeNav,
  hoveredNav,
  focusedNav,
  onHoverNav,
  onFocusNav,
  onSelectNav,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Body scroll lock only while mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Escape key closes mobile menu or triggers number shortcuts
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        return;
      }

      const target = event.target;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (target instanceof HTMLElement &&
          (target.isContentEditable ||
            target.closest('input, textarea, select, [role="textbox"]')))
      ) {
        return;
      }

      if (["1", "2", "3", "4", "5", "6"].includes(event.key)) {
        const index = Number(event.key) - 1;
        if (NAV_ITEMS[index]) {
          HowlerEngine.triggerLightPulseSound();
          onSelectNav(NAV_ITEMS[index].id);
          setIsMobileMenuOpen(false);
        }
      }
    },
    [onSelectNav, isMobileMenuOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleItemClick = (item: NavItem) => {
    HowlerEngine.triggerLightPulseSound();
    onSelectNav(item.id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none select-none"
      role="banner"
    >
      {/* Top Truss Architectural Header Band */}

      <div className="w-full mx-auto px-4 md:px-8 pt-3 pb-2 flex items-start justify-between">
        {/* Left Rig Branding - Exactly as Concept 05 */}

        <div className="pointer-events-auto flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.25em] text-amber-500 font-semibold uppercase">
              DJ
            </span>

            <span className="text-sm md:text-base tracking-[0.3em] font-extrabold text-white font-['Syne']">
              PRAXX
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping opacity-75" />

            <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-zinc-400 font-['Space_Grotesk'] uppercase">
              LIGHTS • MUSIC • PEOPLE
            </span>
          </div>
        </div>

        {/* Center: Stage Light Rig & Destination Labels (Desktop only) */}
        <nav
          className="pointer-events-auto hidden lg:flex flex-col items-center"
          aria-label="Stage Light Rig Navigation"
        >
          {/* 6 Stage Light Navigation Elements */}
          <div
            className="flex items-center justify-center gap-1 sm:gap-5 lg:gap-10 px-2 py-1 rounded-2xl backdrop-blur-md border border-white/5 bg-black/40 shadow-2xl"
            role="tablist"
            aria-orientation="horizontal"
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeNav === item.id;

              const isHovered = hoveredNav === item.id;

              const isFocused = focusedNav === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-light-${item.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={0}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => onHoverNav(item.id)}
                  onMouseLeave={() => onHoverNav(null)}
                  onFocus={() => onFocusNav(item.id)}
                  onBlur={() => onFocusNav(null)}
                  className={`group relative flex flex-col items-center py-1 px-1.5 md:px-2 rounded-xl transition-all duration-300  ${
                    isActive
                      ? "scale-105"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`Navigate to ${item.label}: ${item.description}`}
                >
                  {/* Visual Stage Light Fixture Representation (Complementing 3D WebGL / Fallback) */}

                  {/* Physical Stage Spotlight */}

                  <div className="relative flex flex-col items-center mb-0.5">
                    <svg
                      viewBox="0 0 64 64"
                      className={`w-7 h-7 relative z-10 transition-all duration-300 ${
                        isActive
                          ? "scale-105"
                          : isHovered || isFocused
                            ? "scale-[1.03]"
                            : ""
                      }`}
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        {/* Unique IDs because this SVG is rendered multiple times */}

                        <radialGradient id={`lens-${item.id}`}>
                          <stop
                            offset="0%"
                            stopColor={isActive ? "#fffbea" : "#71717a"}
                          />

                          <stop
                            offset="35%"
                            stopColor={isActive ? "#ffe9a3" : "#52525b"}
                          />

                          <stop
                            offset="70%"
                            stopColor={isActive ? "#ffb52e" : "#3f3f46"}
                          />

                          <stop
                            offset="100%"
                            stopColor={isActive ? "#f07c22" : "#27272a"}
                          />
                        </radialGradient>

                        {/* Strong active lens glow */}

                        <filter
                          id={`glow-${item.id}`}
                          x="-100%"
                          y="-100%"
                          width="300%"
                          height="300%"
                        >
                          <feGaussianBlur
                            stdDeviation={isActive ? "3.5" : "1"}
                            result="blur"
                          />

                          <feMerge>
                            {isActive && <feMergeNode in="blur" />}

                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Yoke / mounting bracket */}

                      <path
                        d="M20 20V13C20 10.8 21.8 9 24 9H40C42.2 9 44 10.8 44 13V20"
                        stroke={
                          isActive
                            ? "#f59e0b"
                            : isHovered || isFocused
                              ? "#a16207"
                              : "#52525b"
                        }
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />

                      {/* Side mounting supports */}

                      <path
                        d="M19 22L15 31M45 22L49 31"
                        stroke={
                          isActive
                            ? "#b7790a"
                            : isHovered || isFocused
                              ? "#854d0e"
                              : "#3f3f46"
                        }
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />

                      {/* Main metal fixture housing */}

                      <path
                        d="

                          M19 21

                          H45

                          L49 39

                          C49.5 42 47 44 44 44

                          H20

                          C17 44 14.5 42 15 39

                          Z

                        "
                        fill={isActive ? "#211b12" : "#18181b"}
                        stroke={
                          isActive
                            ? "#a16207"
                            : isHovered || isFocused
                              ? "#52525b"
                              : "#3f3f46"
                        }
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />

                      {/* Housing top detail */}

                      <path
                        d="M22 24H42"
                        stroke={isActive ? "#785514" : "#3f3f46"}
                        strokeWidth="1"
                      />

                      {/* Outer lens housing */}

                      <ellipse
                        cx="32"
                        cy="35"
                        rx="12"
                        ry="7"
                        fill="#09090b"
                        stroke={
                          isActive
                            ? "#d97706"
                            : isHovered || isFocused
                              ? "#71717a"
                              : "#3f3f46"
                        }
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />

                      {/* Actual optical lens */}

                      <ellipse
                        cx="32"
                        cy="35"
                        rx="8"
                        ry="4"
                        fill={`url(#lens-${item.id})`}
                        filter={isActive ? `url(#glow-${item.id})` : undefined}
                        className="transition-all duration-300"
                      />

                      {/* Bright center visible ONLY when powered */}

                      {isActive && (
                        <ellipse
                          cx="32"
                          cy="35"
                          rx="4.5"
                          ry="2"
                          fill="#fff8dc"
                          opacity="0.95"
                        />
                      )}
                    </svg>

                    {/* Light cone — ONLY active spotlight emits it */}

                    <div
                      className={`absolute top-[21px] pointer-events-none

      transition-all duration-500

      ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"}

    `}
                      style={{
                        width: "42px",

                        height: "43px",

                        background: `

        linear-gradient(

          to bottom,

          rgba(255, 238, 184, 0.30) 0%,

          rgba(245, 158, 11, 0.16) 35%,

          rgba(240, 124, 34, 0.06) 70%,

          transparent 100%

        )

      `,

                        clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",

                        filter: "blur(3px)",

                        transformOrigin: "top center",
                      }}
                    />

                    {/* Hot center of beam */}

                    <div
                      className={`absolute top-[22px] pointer-events-none

      transition-opacity duration-300

      ${isActive ? "opacity-100" : "opacity-0"}

    `}
                      style={{
                        width: "20px",

                        height: "33px",

                        background: `

                          linear-gradient(

                            to bottom,

                            rgba(255,255,235,0.30),

                            rgba(255,190,60,0.08),

                            transparent

                          )

                        `,

                        clipPath: "polygon(43% 0%, 57% 0%, 100% 100%, 0% 100%)",

                        filter: "blur(2px)",
                      }}
                    />
                  </div>

                  {/* Navigation Destination Label */}

                  <span
                    className={`text-[10px] md:text-xs tracking-[0.15em] font-semibold transition-all duration-300 font-['Space_Grotesk'] ${
                      isActive
                        ? "text-amber-400 drop-shadow-[0_0_8px_rgba(240,124,34,0.8)] font-bold"
                        : isHovered || isFocused
                          ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]"
                          : "text-zinc-400"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Keyboard Shortcut badge (Desktop) */}

                  <span className="hidden lg:block text-[7px] tracking-wider text-zinc-600 group-hover:text-zinc-400 mt-0.5 font-mono">
                    [{index + 1}]
                  </span>

                  {/* Floor Spotlight Pool under active label */}

                  {isActive && (
                    <div
                      className="absolute -bottom-1 w-8 h-1 rounded-full bg-amber-500/80 shadow-[0_0_12px_#f07c22]"
                      style={{ filter: "blur(1px)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Rig Slogan - Desktop Only */}
        <div className="pointer-events-auto hidden lg:flex flex-col items-end text-right">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-300 font-medium font-['Space_Grotesk'] uppercase">
            A HIGHER STATE
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-amber-500 font-bold font-['Space_Grotesk'] uppercase">
            TOGETHER
          </span>
          <div className="w-6 h-px bg-amber-500/60 mt-1" />
        </div>

        {/* Mobile & Tablet Compact Hamburger Menu Toggle (Top-Right) */}
        <div className="pointer-events-auto flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-black/80 border border-white/15 text-zinc-300 hover:text-white hover:border-amber-500/50 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-amber-400" />
            ) : (
              <Menu className="w-5 h-5 text-amber-400" />
            )}
          </button>
        </div>
      </div>

      {/* Right-Side Slide-in Drawer Above Content */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 pointer-events-auto flex justify-end animate-fadeIn select-none"
        >
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Right-Side Panel */}
          <aside
            className="relative z-10 w-[min(340px,86vw)] h-full bg-[#0a0b0f] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto overscroll-contain transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.25em] text-amber-500 font-semibold uppercase">
                      DJ
                    </span>
                    <span className="text-base tracking-[0.3em] font-extrabold text-white font-['Syne']">
                      PRAXX
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.2em] text-zinc-400 font-['Space_Grotesk'] uppercase mt-0.5">
                    NAVIGATION MENU
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Destinations */}
              <nav aria-label="Mobile Navigation Destinations">
                <ul className="flex flex-col gap-2.5">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeNav === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-amber-500/15 border-amber-500/50 text-white shadow-[0_0_15px_rgba(240,124,34,0.2)]"
                              : "bg-white/[0.03] border-white/5 text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-bold ${
                                isActive
                                  ? "bg-amber-500 text-black font-extrabold"
                                  : "bg-white/10 text-zinc-400"
                              }`}
                            >
                              0{index + 1}
                            </span>
                            <div className="flex flex-col">
                              <span
                                className={`text-sm font-bold tracking-[0.2em] font-['Space_Grotesk'] uppercase ${
                                  isActive ? "text-amber-400" : "text-white"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="text-[11px] text-zinc-400 font-['Inter']">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>

                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f07c22] animate-pulse" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-['Space_Grotesk'] uppercase">
                  LIGHTS • MUSIC • PEOPLE
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-zinc-500 font-['Space_Grotesk'] uppercase">
                A HIGHER STATE TOGETHER
              </p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
