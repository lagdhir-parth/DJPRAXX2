import React from "react";
import { type StoryboardScene } from "../../types/navigation";
import { HowlerEngine } from "../../audio/howlerEngine";
import { useScene } from "../../context/SceneContext";

// All 20 Scenes from Storyboard
import { LoadingScene } from "../scenes/01_LoadingScene";
import { TransitionScene } from "../scenes/02_TransitionScene";
import VoidScene from "../scenes/03_Entrance";
import EntranceScene from "../scenes/04_Entrance_Tunnel";
import AudienceScene from "../scenes/05_Audience";
import MainStageScene from "../scenes/06_Main_Stage_Reveal";
import InteractiveDJBoothScene from "../scenes/07_Interactive_DJ_Booth";
import PraxxRadioScene from "../scenes/08_09_Praxx_Music";
import EventArchiveScene, {
  type EventItem,
} from "../scenes/10_11_Event_Archive";
import BiographyEntranceScene from "../scenes/12_Biography_Entrance";
import BiographyChaptersScene from "../scenes/13_Biography_Chapter";
import { motion, AnimatePresence } from "motion/react";
import ExitExperienceScene from "../scenes/17_Exit_Experience";
import FinalScreenScene from "../scenes/18_Final_Screen";

interface SceneLayerProps {
  activeScene: StoryboardScene;
  setActiveScene: (scene: StoryboardScene) => void;
  handleSelectScene: (scene: StoryboardScene) => void;
  selectedEvent?: EventItem;
  setSelectedEvent: (event: EventItem) => void;
  bookingDetails?: {
    name: string;
    eventType: string;
    date: string;
    venue: string;
  };
  setBookingDetails: (details: {
    name: string;
    eventType: string;
    date: string;
    venue: string;
  }) => void;
}

const SceneLayer: React.FC<SceneLayerProps> = () => {
  const { activeScene, handleSelectScene } = useScene();
  return (
    <main className="relative z-20 w-full min-h-screen flex flex-col justify-center">
      {activeScene === "01_loading" && (
        <LoadingScene onComplete={() => handleSelectScene("02_transition")} />
      )}

      {activeScene === "02_transition" && (
        <TransitionScene
          onComplete={async () => {
            try {
              await HowlerEngine.startAudio();
            } catch (error) {
              console.error("Audio initialization failed:", error);
            } finally {
              handleSelectScene("03_entrance");
            }
          }}
        />
      )}

      <AnimatePresence mode="sync" initial={false}>
        {activeScene === "03_entrance" && (
          <motion.div
            key="entrance"
            className="absolute inset-0"
            initial={{
              opacity: 1,
              scale: 1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.3,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <VoidScene />
          </motion.div>
        )}

        {activeScene === "04_entrance_tunnel" && (
          <motion.div
            key="entrance-tunnel"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <EntranceScene />
          </motion.div>
        )}
        {activeScene === "05_audience" && (
          <motion.div
            key="audience"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <AudienceScene />
          </motion.div>
        )}

        {activeScene === "06_main_stage_reveal" && (
          <motion.div
            key="main-stage-reveal"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MainStageScene />
          </motion.div>
        )}
        {activeScene === "07_dj_booth" && (
          <motion.div
            key="dj-booth"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <InteractiveDJBoothScene />
          </motion.div>
        )}

        {(activeScene === "10_event_archive" ||
          activeScene === "11_event_detail") && (
          <motion.div
            key="event-archive"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <EventArchiveScene />
          </motion.div>
        )}
        {(activeScene === "08_praxx_radio" ||
          activeScene === "09_sound_universe") && (
          <motion.div
            key="praxx-sound-universe"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <PraxxRadioScene />
          </motion.div>
        )}

        {activeScene === "12_biography_entrance" && (
          <motion.div
            key="biography-entrance"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <BiographyEntranceScene />
          </motion.div>
        )}
        {activeScene === "13_biography_chapter" && (
          <motion.div
            key="biography-chapter"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <BiographyChaptersScene />
          </motion.div>
        )}
        {activeScene === "17_exit_experience" && (
          <motion.div
            key="exit-experience"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ExitExperienceScene />
          </motion.div>
        )}
        {activeScene === "18_final_screen" && (
          <motion.div
            key="final-screen"
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <FinalScreenScene />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default SceneLayer;
