import "./TopBar.css";

export default function TopBar({ setActivePage, activePage }) {
  return (
    <header className="topbar">
      <button
        className={`topbar-button ${activePage === "mood-tracker" ? "active" : ""}`}
        onClick={() => setActivePage("mood-tracker")}
      >
        <img
        src="/icons/mood.png"  
        alt="Meditation icon"
        style={{ width: "32px", height: "32px" }}
        />
        Mood Tracker
      </button>

      <button
        className={`topbar-button ${activePage === "meditation" ? "active" : ""}`}
        onClick={() => setActivePage("meditation")}
      >
        <img
        src="/icons/meditation.png"  
        alt="Meditation icon"
        style={{ width: "32px", height: "32px" }}
        />
        Meditation
      </button>

      <button
        className={`topbar-button ${activePage === "videos" ? "active" : ""}`}
        onClick={() => setActivePage("videos")}
      >
        <img
        src="/icons/youtube.png"  
        alt="Meditation icon"
        style={{ width: "32px", height: "32px" }}
        />
        Videos
      </button>

      <button
        className={`topbar-button ${activePage === "sounds" ? "active" : ""}`}
        onClick={() => setActivePage("sounds")}
      >
        <img
        src="/icons/music.png"  
        alt="Meditation icon"
        style={{ width: "32px", height: "32px" }}
        />
        Sounds
      </button>

      <button
        className={`topbar-button ${activePage === "chat-helper" ? "active" : ""}`}
        onClick={() => setActivePage("chat-helper")}
      >
        <img
        src="/icons/chat.png"  
        alt="Meditation icon"
        style={{ width: "32px", height: "32px" }}
        />
        Chat Helper
      </button>
    </header>
  );
}
