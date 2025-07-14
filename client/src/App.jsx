import { useState } from "react";
import TopBar from "./Components/TopBar";
import Footer from "./Components/Footer";
import MeditationPage from "./Components/Meditation/MeditationPage";
import VideosPage from "./Components/Videos/VideosPage";
import SoundsPage from "./Components/Sounds/SoundsPage";
import MoodTracker from "./Components/MoodTracker/MoodTracker";
import ChatHelper from "./Components/ChatHelper/ChatHelper"

export default function App() {
  const [activePage, setActivePage] = useState("mood-tracker");

  return (
    <div className="app-container">
      <TopBar setActivePage={setActivePage} activePage={activePage} />

      <main style={{ flex: 1, padding: "2rem" }}>
        {activePage === "meditation" && <MeditationPage />}
        {activePage === "videos" && <VideosPage />}
        {activePage === "sounds" && <SoundsPage />}
        {activePage === "mood-tracker" && <MoodTracker />}
        {activePage === "chat-helper" && <ChatHelper />}
      </main>

      <Footer />
    </div>
  );
}
