import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useScene } from "../../context/SceneContext";
import PraxxRadioScene from "../uiLayers/08_Praxx_Radio";
import { SoundUniverseScene } from "../uiLayers/09_Sound_Universe";
import { BookingScene } from "../uiLayers/15_Booking";
import { BookingSuccessScene } from "../uiLayers/16_Booking_Success";
import { ExitExperienceScene } from "../uiLayers/17_Exit_Experience";
import ArtistProfileScene from "../uiLayers/14_Artist_Profile";
import { FinalScreenScene } from "../uiLayers/18_Final_Screen";

// New scene UILayers
import EntranceTunnelUI from "../uiLayers/04_Entrance_Tunnel";
import AudienceUI from "../uiLayers/05_Audience";
import MainStageRevealUI from "../uiLayers/06_Main_Stage_Reveal";
import DjBoothUI from "../uiLayers/07_Dj_Booth";
import EventArchiveUI from "../uiLayers/10_Event_Archive";
import EventDetailUI from "../uiLayers/11_Event_Detail";
import BiographyEntranceUI from "../uiLayers/12_Biography_Entrance";
import BiographyChapterUI from "../uiLayers/13_Biography_Chapter";
import { EVENTS_DATA, type EventItem } from "../scenes/10_11_Event_Archive";
import { EntranceScene } from "../uiLayers/03_Entrance";

interface UILayerProps {
  bookingDetails: {
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

const UILayer: React.FC<UILayerProps> = ({
  bookingDetails,
  setBookingDetails,
}: UILayerProps) => {
  const { activeScene, setActiveScene } = useScene();

  // Local event selection state — shared between Archive and Detail
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(EVENTS_DATA[0]);

  return (
    <div>
      <AnimatePresence mode="sync">
        {/* UI Layer content goes here */}
        {activeScene === "03_entrance" && (
          <EntranceScene
            key="ui-03"
            onNext={() => setActiveScene("04_entrance_tunnel")}
          />
        )}

        {activeScene === "04_entrance_tunnel" && (
          <EntranceTunnelUI key="ui-04" />
        )}

        {activeScene === "05_audience" && <AudienceUI key="ui-05" />}

        {activeScene === "06_main_stage_reveal" && (
          <MainStageRevealUI key="ui-06" />
        )}

        {activeScene === "07_dj_booth" && <DjBoothUI key="ui-07" />}

        {activeScene === "10_event_archive" && (
          <EventArchiveUI
            key="ui-10"
            onSelectEvent={(ev) => {
              setSelectedEvent(ev);
              setActiveScene("11_event_detail");
            }}
          />
        )}

        {activeScene === "11_event_detail" && (
          <EventDetailUI
            key="ui-11"
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
          />
        )}

        {activeScene === "12_biography_entrance" && (
          <BiographyEntranceUI key="ui-12" />
        )}

        {activeScene === "13_biography_chapter" && (
          <BiographyChapterUI key="ui-13" />
        )}

        {activeScene === "08_praxx_radio" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <PraxxRadioScene
              onNext={() => setActiveScene("09_sound_universe")}
            />
          </div>
        )}

        {activeScene === "09_sound_universe" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <SoundUniverseScene />
          </div>
        )}

        {activeScene === "14_artist_profile" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <ArtistProfileScene onNext={() => setActiveScene("15_booking")} />
          </div>
        )}

        {activeScene === "15_booking" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <BookingScene
              onSuccess={(data) => {
                setBookingDetails(data);
                setActiveScene("16_booking_success");
              }}
            />
          </div>
        )}

        {activeScene === "16_booking_success" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <BookingSuccessScene
              bookingData={bookingDetails}
              onNext={() => setActiveScene("17_exit_experience")}
            />
          </div>
        )}

        {activeScene === "17_exit_experience" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <ExitExperienceScene
              onNext={() => setActiveScene("18_final_screen")}
            />
          </div>
        )}

        {activeScene === "18_final_screen" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start sm:justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-16 pb-20 sm:py-12">
            <FinalScreenScene onReplay={() => setActiveScene("03_entrance")} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UILayer;
