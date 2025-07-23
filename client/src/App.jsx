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
  const [natureAudio, setNatureAudio] = useState(null);
  const bgAudioRef = useRef(null);

  const pauseNatureSound = () => {
  if (natureAudio) {
    natureAudio.pause();
  }
};

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.loop = true;

    if (bgPlaying) {
      pauseNatureSound(); 

      audio.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    } else {
      audio.pause();
    }
  }, [bgPlaying]);

  const pauseBackgroundMusic = () => {
    const audio = bgAudioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setBgPlaying(false);
    }
  };

  return (
    <div className="app-container">
      <TopBar
        setActivePage={setActivePage}
        activePage={activePage}
        bgPlaying={bgPlaying}
        toggleBgMusic={() => setBgPlaying((prev) => !prev)}
      />

      <main style={{ flex: 1, padding: "0 2rem 2rem 2rem" }}>
        {activePage === "meditation" && <MeditationPage
          bgPlaying={bgPlaying}
          toggleBgMusic={() => setBgPlaying((prev) => !prev)}
        />}
        {activePage === "videos" && <VideosPage />}
        {activePage === "sounds" && (
          <SoundsPage 
          pauseBackgroundMusic={pauseBackgroundMusic}
          setNatureAudio={setNatureAudio}
          />
        )}
        {activePage === "mood-tracker" && <MoodTracker />}
        {activePage === "affirmations" && <Affirmations />}
        {activePage === "chat-helper" && <ChatHelper />}
      </main>

      <Footer />
      <audio ref={bgAudioRef} src="/sounds/background.mp3" />
    </div>
  );
}
