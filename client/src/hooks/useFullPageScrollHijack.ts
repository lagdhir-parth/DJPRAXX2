import { useEffect, useRef } from "react";
import { type StoryboardScene, SCENES_DATA } from "../types/navigation";

/**
 * Storyboard scenes in sequential presentation order
 * (Excluding 01_loading and 02_transition which are intro-only).
 */
export const SCROLLABLE_SCENES: StoryboardScene[] = [
  "03_entrance",
  "04_entrance_tunnel",
  "05_audience",
  "06_main_stage_reveal",
  "07_dj_booth",
  "08_praxx_radio",
  "09_sound_universe",
  "10_event_archive",
  "11_event_detail",
  "12_biography_entrance",
  "13_biography_chapter",
  "14_artist_profile",
  "15_booking",
  "16_booking_success",
  "17_exit_experience",
  "18_final_screen",
];

/**
 * Dynamically extract and normalize the current scene ID directly from the URL hash.
 */
export function getSceneIdFromURL(): StoryboardScene | null {
  if (typeof window === "undefined") return null;

  const hash = window.location.hash;
  if (!hash) return null;

  const clean = hash.replace(/^#[/]?/, "").trim().toLowerCase();
  if (!clean) return null;

  // 1. Direct exact match (e.g. "10_event_archive")
  const directMatch = SCENES_DATA.find((s) => s.id.toLowerCase() === clean);
  if (directMatch) return directMatch.id;

  // 2. Number or prefix match (e.g. "10" -> "10_event_archive")
  const numOnly = clean.replace(/^scene[-_]?/, "");
  const numMatch = SCENES_DATA.find(
    (s) => s.number === numOnly || s.id.toLowerCase().startsWith(numOnly),
  );
  if (numMatch) return numMatch.id;

  return null;
}

/**
 * Checks if an event target or any of its parents is a scrollable container
 * that still has scrollable distance in the direction the user is scrolling.
 */
function isInsideScrollableElement(
  target: EventTarget | null,
  deltaY: number,
): boolean {
  if (!(target instanceof HTMLElement)) return false;

  // Always ignore form fields, buttons, interactive controls
  if (
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="slider"], [role="textbox"]',
    )
  ) {
    return true;
  }

  let element: HTMLElement | null = target;

  while (
    element &&
    element !== document.body &&
    element !== document.documentElement
  ) {
    const style = window.getComputedStyle(element);
    const overflowY = style.overflowY;
    const isScrollable =
      (overflowY === "auto" || overflowY === "scroll") &&
      element.scrollHeight > element.clientHeight;

    if (isScrollable) {
      const atTop = element.scrollTop <= 1;
      const atBottom =
        Math.ceil(element.scrollTop + element.clientHeight) >=
        element.scrollHeight - 1;

      if (deltaY > 0 && !atBottom) {
        return true;
      }
      if (deltaY < 0 && !atTop) {
        return true;
      }
    }

    element = element.parentElement;
  }

  return false;
}

interface FullPageScrollHijackOptions {
  activeScene: StoryboardScene;
  onSelectScene: (scene: StoryboardScene) => void;
  enabled?: boolean;
  cooldownMs?: number;
  wheelThreshold?: number;
  touchThreshold?: number;
}

/**
 * useFullPageScrollHijack
 *
 * Guarantees EXACTLY ONE scene transition per scroll gesture or arrow key press.
 * Prevents double-scene jumping via:
 * 1. Dynamic live URL parsing on every event.
 * 2. Trackpad momentum inertia lock (absorbs residual wheel events until device rests).
 * 3. Separate, snappy cooldown for keyboard Up/Down arrows.
 */
export function useFullPageScrollHijack({
  activeScene,
  onSelectScene,
  enabled = true,
  cooldownMs = 800,
  wheelThreshold = 45,
  touchThreshold = 45,
}: FullPageScrollHijackOptions) {
  const isLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const accumulatedDeltaRef = useRef(0);
  const resetDeltaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trackpad inertia tracking
  const lastWheelTimeRef = useRef(0);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep latest values in refs to prevent any stale closures
  const activeSceneRef = useRef(activeScene);
  activeSceneRef.current = activeScene;

  const onSelectSceneRef = useRef(onSelectScene);
  onSelectSceneRef.current = onSelectScene;

  const navigateScene = (
    direction: "next" | "prev",
    lockDuration = cooldownMs,
  ): boolean => {
    if (isLockedRef.current) return false;

    // 1. Fetch current scene directly from URL hash (with activeScene fallback)
    const urlScene = getSceneIdFromURL();
    const currentScene = urlScene || activeSceneRef.current;

    // Never hijack during intro loading/transition
    if (currentScene === "01_loading" || currentScene === "02_transition") {
      return false;
    }

    let currentIndex = SCROLLABLE_SCENES.indexOf(currentScene);

    if (currentIndex === -1) {
      const metaIndex = SCENES_DATA.findIndex((s) => s.id === currentScene);
      if (metaIndex >= 2) {
        currentIndex = metaIndex - 2;
      } else {
        currentIndex = 0;
      }
    }

    let targetScene: StoryboardScene | null = null;

    if (direction === "next") {
      if (currentIndex < SCROLLABLE_SCENES.length - 1) {
        targetScene = SCROLLABLE_SCENES[currentIndex + 1];
      }
    } else {
      if (currentIndex > 0) {
        targetScene = SCROLLABLE_SCENES[currentIndex - 1];
      }
    }

    if (targetScene && targetScene !== currentScene) {
      // Engage lock IMMEDIATELY
      isLockedRef.current = true;
      accumulatedDeltaRef.current = 0;

      onSelectSceneRef.current(targetScene);

      // Schedule unlock with trackpad inertia protection
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

      const checkUnlock = () => {
        const timeSinceLastWheel = Date.now() - lastWheelTimeRef.current;
        // If wheel events are still arriving from inertia, wait until it settles
        if (timeSinceLastWheel < 140) {
          unlockTimerRef.current = setTimeout(checkUnlock, 100);
        } else {
          isLockedRef.current = false;
          accumulatedDeltaRef.current = 0;
        }
      };

      unlockTimerRef.current = setTimeout(checkUnlock, lockDuration);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!enabled) return;

    /**
     * Mouse Wheel / Trackpad
     */
    const handleWheel = (event: WheelEvent) => {
      lastWheelTimeRef.current = Date.now();

      if (isInsideScrollableElement(event.target, event.deltaY)) {
        return;
      }

      event.preventDefault();

      // If already locked, consume event and do not accumulate
      if (isLockedRef.current) {
        accumulatedDeltaRef.current = 0;
        return;
      }

      accumulatedDeltaRef.current += event.deltaY;

      if (resetDeltaTimerRef.current) {
        clearTimeout(resetDeltaTimerRef.current);
      }

      resetDeltaTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 150);

      if (accumulatedDeltaRef.current >= wheelThreshold) {
        accumulatedDeltaRef.current = 0;
        navigateScene("next", cooldownMs);
      } else if (accumulatedDeltaRef.current <= -wheelThreshold) {
        accumulatedDeltaRef.current = 0;
        navigateScene("prev", cooldownMs);
      }
    };

    /**
     * Touch Gestures (Mobile / Tablets)
     */
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        touchStartYRef.current = event.touches[0].clientY;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;

      const deltaY = touchStartYRef.current - endY;
      touchStartYRef.current = null;

      if (isInsideScrollableElement(event.target, deltaY)) {
        return;
      }

      if (Math.abs(deltaY) >= touchThreshold) {
        if (deltaY > 0) {
          navigateScene("next", cooldownMs);
        } else {
          navigateScene("prev", cooldownMs);
        }
      }
    };

    /**
     * Keyboard Navigation: Up Arrow, Down Arrow, PageUp, PageDown
     */
    const handleKeyDown = (event: KeyboardEvent) => {
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

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        navigateScene("next", 450);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        navigateScene("prev", 450);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (resetDeltaTimerRef.current) clearTimeout(resetDeltaTimerRef.current);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [enabled, cooldownMs, wheelThreshold, touchThreshold]);
}
