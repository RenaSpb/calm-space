import "./TopBar.css";

export default function TopBar({ setActivePage, activePage }) {
  return (
    <header className="topbar">
      <button
        className={`topbar-button ${activePage === "mood-tracker" ? "active" : ""}`}
        onClick={() => setActivePage("mood-tracker")}
      >
        Mood Tracker
      </button>

      <button
        className={`topbar-button ${activePage === "meditation" ? "active" : ""}`}
        onClick={() => setActivePage("meditation")}
      >
        Meditation
      </button>

      <button
        className={`topbar-button ${activePage === "videos" ? "active" : ""}`}
        onClick={() => setActivePage("videos")}
      >
        Videos
      </button>

      <button
        className={`topbar-button ${activePage === "sounds" ? "active" : ""}`}
        onClick={() => setActivePage("sounds")}
      >
        Sounds
      </button>

      <button
        className={`topbar-button ${activePage === "chat-helper" ? "active" : ""}`}
        onClick={() => setActivePage("chat-helper")}
      >
        Chat Helper
      </button>
    </header>
  );
}
