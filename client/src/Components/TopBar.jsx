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
        alt="Mood icon"
        style={{ width: "32px", height: "32px" }}
        />
        <span className="button-label">Mood</span>
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
        <span className="button-label">Meditation</span>
      </button>

      <button
        className={`topbar-button ${activePage === "videos" ? "active" : ""}`}
        onClick={() => setActivePage("videos")}
      >
        <img
        src="/icons/youtube.png"  
        alt="Youtube icon"
        style={{ width: "32px", height: "32px" }}
        />
        <span className="button-label">Videos</span>
      </button>

      <button
        className={`topbar-button ${activePage === "sounds" ? "active" : ""}`}
        onClick={() => setActivePage("sounds")}
      >
        <img
        src="/icons/music.png"  
        alt="Sounds icon"
        style={{ width: "32px", height: "32px" }}
        />
        <span className="button-label">Sounds</span>
      </button>

      <button
        className={`topbar-button ${activePage === "affirmations" ? "active" : ""}`}
        onClick={() => setActivePage("affirmations")}
      >
        <img
        src="/icons/affirmation.png"  
        alt="Affirmation icon"
        style={{ width: "32px", height: "32px" }}
        />
        <span className="button-label">Affirmations</span>
      </button>

      <button
        className={`topbar-button ${activePage === "chat-helper" ? "active" : ""}`}
        onClick={() => setActivePage("chat-helper")}
      >
        <img
        src="/icons/chat.png"  
        alt="Chat icon"
        style={{ width: "32px", height: "32px" }}
        />
        <span className="button-label">Chat</span>
      </button>
    </header>
  );
}
