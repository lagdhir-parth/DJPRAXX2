import { useEffect, useState, useCallback } from "react";
import { preloadImages } from "./utils/preloadImages";

import {
  type NavDestination,
  type StoryboardScene,
  NAV_ITEMS,
} from "./types/navigation";
import { HowlerEngine } from "./audio/howlerEngine";
import { useFullPageScrollHijack } from "./hooks/useFullPageScrollHijack";

import {
  type EventItem,
  EVENTS_DATA,
} from "./components/scenes/10_11_Event_Archive";

import { StageLightNav } from "./components/stageNav/StageLightNav";
import { AudioHUD } from "./components/audio/AudioHUD";
import { SceneTimelineScrubber } from "./components/navigation/SceneTimelineScrubber";

// import { useResponsiveExperience } from "./components/mobile/hooks/useResponsiveExperience";
// import { MobileExperience } from "./components/mobile/MobileExperience";

import SceneLayer from "./components/layers/SceneLayer";
import UILayer from "./components/layers/UILayer";
import CanvasLayer from "./components/layers/CanvasLayer";

import { SceneProvider, useScene } from "./context/SceneContext";

import jogWheel from "./assets/images/JogWheel.png";
import profilePic from "./assets/images/profile/profilePic.png";

import entranceImage from "./assets/images/sceneImages/03_entrance.webp";
import entranceTunnelImage from "./assets/images/sceneImages/04_entrance_tunnel.webp";
import audienceImage from "./assets/images/sceneImages/05_audience.webp";
import mainStageRevealImage from "./assets/images/sceneImages/06_Main_Stage_Reveal.webp";
import djBoothImage from "./assets/images/sceneImages/07_Interactive_DJ_Booth.webp";
import eventArchiveImage from "./assets/images/sceneImages/10_Event_Archive.webp";
import biographyEntranceImage from "./assets/images/sceneImages/12_Biography_Entrance.webp";
import biographyChaptersImage from "./assets/images/sceneImages/13_Biography_Chapters.webp";
import exitExperienceImage from "./assets/images/sceneImages/17_Exit_Experience.webp";
import finalScreenImage from "./assets/images/sceneImages/18_Final_Screen.webp";
import musicSceneImage from "./assets/images/sceneImages/Music_Scene.webp";

const experienceImages = [
  jogWheel,
  profilePic,
  entranceImage,
  entranceTunnelImage,
  audienceImage,
  mainStageRevealImage,
  djBoothImage,
  eventArchiveImage,
  biographyEntranceImage,
  biographyChaptersImage,
  exitExperienceImage,
  finalScreenImage,
  musicSceneImage,
];

function AppContent() {
  // const { isMobile, isReducedMotion: responsiveReducedMotion } =
  //   useResponsiveExperience();

  /**
   * Scene state now comes from Context.
   */
  const { activeScene, activeNav, setActiveScene, handleSelectScene } =
    useScene();

  // Navigation UI States
  const [hoveredNav, setHoveredNav] = useState<NavDestination | null>(null);

  const [focusedNav, setFocusedNav] = useState<NavDestination | null>(null);

  // App Context States
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(EVENTS_DATA[0]);

  const [bookingDetails, setBookingDetails] = useState<{
    name: string;
    eventType: string;
    date: string;
    venue: string;
  }>({
    name: "",
    eventType: "Wedding",
    date: "",
    venue: "",
  });

  useEffect(() => {
    preloadImages(experienceImages);
  }, []);

  /**
   * Stage Light Navigation
   */
  const handleSelectNav = useCallback(
    (dest: NavDestination) => {
      const targetItem = NAV_ITEMS.find((item) => item.id === dest);

      if (!targetItem) return;

      /**
       * Context automatically:
       *
       * 1. changes activeScene
       * 2. updates activeNav
       * 3. updates URL
       */
      handleSelectScene(targetItem.sceneTarget);
    },
    [handleSelectScene],
  );

  /**
   * Stage light navigation starts after
   * intro scenes.
   */
  const showStageLightNav = !["01_loading", "02_transition"].includes(
    activeScene,
  );

  /**
   * Full-Page Scroll Hijacking / Presentation Frame-Switching
   * Fetches current scene from URL dynamically and smoothly transitions to next/prev scene.
   */
  const handleScrollSelectScene = useCallback(
    (scene: StoryboardScene) => {
      HowlerEngine.triggerLightPulseSound();
      handleSelectScene(scene);
    },
    [handleSelectScene],
  );



  useFullPageScrollHijack({
    activeScene,
    onSelectScene: handleScrollSelectScene,
    enabled: showStageLightNav,
    cooldownMs: 800,
    wheelThreshold: 25,
    touchThreshold: 50,
  });

  return (
    <div
      className="
      relative
      min-h-screen
      w-full
      bg-[#050508]
      text-white
      overflow-hidden
      selection:bg-amber-500
      selection:text-black
    "
    >
      {showStageLightNav && (
        <StageLightNav
          activeNav={activeNav}
          hoveredNav={hoveredNav}
          focusedNav={focusedNav}
          onHoverNav={setHoveredNav}
          onFocusNav={setFocusedNav}
          onSelectNav={handleSelectNav}
        />
      )}

      {/* Main 20-scene experience */}
      <SceneLayer
        activeScene={activeScene}
        setActiveScene={setActiveScene}
        handleSelectScene={handleSelectScene}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
      />

      <CanvasLayer activeScene={activeScene} />

      <UILayer
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
      />

      {/* DJ Audio HUD */}
      {showStageLightNav && <AudioHUD />}

      {/* Scene Timeline */}
      {showStageLightNav && (
        <SceneTimelineScrubber
          currentScene={activeScene}
          onSelectScene={handleSelectScene}
        />
      )}
    </div>
  );
}

/**
 * Context provider wraps the application.
 */
export function App() {
  return (
    <SceneProvider>
      <AppContent />
    </SceneProvider>
  );
}

export default App;
