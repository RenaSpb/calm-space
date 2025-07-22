import { useRef, useState, useEffect } from "react";
import TopBar from "./Components/TopBar";
import Footer from "./Components/Footer";
import MeditationPage from "./Components/Meditation/MeditationPage";
import VideosPage from "./Components/Videos/VideosPage";
import SoundsPage from "./Components/Sounds/SoundsPage";
import MoodTracker from "./Components/MoodTracker/MoodTracker";
import ChatHelper from "./Components/ChatHelper/ChatHelper";
import Affirmations from "./Components/Affirmations/Affirmations";

export default function App() {
  const [activePage, setActivePage] = useState("mood-tracker");

  const [bgPlaying, setBgPlaying] = useState(false);
  const bgAudioRef = useRef(null);

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.loop = true;

    if (bgPlaying) {
      audio.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    } else {
      audio.pause();
    }
  }, [bgPlaying]);

  return (
    <div className="app-container">
      <TopBar
        setActivePage={setActivePage}
        activePage={activePage}
        bgPlaying={bgPlaying}
        toggleBgMusic={() => setBgPlaying((prev) => !prev)}
      />

      <main style={{ flex: 1, padding: "2rem" }}>
        {activePage === "meditation" && <MeditationPage />}
        {activePage === "videos" && <VideosPage />}
        {activePage === "sounds" && <SoundsPage />}
        {activePage === "mood-tracker" && <MoodTracker />}
        {activePage === "affirmations" && <Affirmations />}
        {activePage === "chat-helper" && <ChatHelper />}
      </main>

      <Footer />

      <audio ref={bgAudioRef} src="/sounds/background.mp3" />
    </div>
  );
}
