import { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodChart from "./MoodChart";

const moods = [
  { id: "happy", label: "Happy", icon: "😊" },
  { id: "sad", label: "Sad", icon: "😢" },
  { id: "calm", label: "Calm", icon: "😌" },
  { id: "anxious", label: "Anxious", icon: "😰" },
  { id: "tired", label: "Tired", icon: "😴" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);

  const handleMoodClick = (moodId) => {
    setSelectedMood(moodId);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/mood`);
        if (!response.ok) throw new Error("Failed to fetch moods");
        const data = await response.json();
        setHistory(
          data.map((entry) => ({
            mood: moods.find((m) => m.label === entry.mood) || {
              icon: "❓",
              label: entry.mood,
            },
            note: entry.note,
            date: new Date(entry.created_at).toLocaleString(),
          }))
        );
      } catch (error) {
        console.error("Error loading mood history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleSave = async () => {
    if (!selectedMood) return;
    const selected = moods.find((m) => m.id === selectedMood);

    const newEntry = {
      mood: selected.label,
      note,
      date: new Date().toLocaleString(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: newEntry.mood, note: newEntry.note }),
      });

      if (!response.ok) throw new Error("Failed to save mood");

      setHistory([newEntry, ...history]);
      setSelectedMood(null);
      setNote("");
    } catch (error) {
      console.error("Error saving mood:", error);
      alert("Could not save mood. Please try again.");
    }
  };

  return (
    <div className="page-fade">
      <div className="dashboard">
        {/* Left Panel */}
        <div className="panel panel-left">
          <h2 className="panel-title">How are you feeling today?</h2>
          <div className="mood-options">
            {moods.map((mood) => (
              <button
                key={mood.id}
                className={`mood-btn ${
                  selectedMood === mood.id ? "selected" : ""
                }`}
                onClick={() => handleMoodClick(mood.id)}
              >
                <span className="icon">{mood.icon}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="note-section">
              <textarea
                placeholder="Hey! Tell me a little bit more, if you want to..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button
                className="save-btn"
                onClick={handleSave}
                aria-label="Save mood"
              >
                <img src="/icons/done.png" alt="Save" className="save-icon" />
              </button>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="panel">
          <h2 className="panel-title">Mood Over Time</h2>
          {history.length > 0 ? (
            <MoodChart history={history} />
          ) : (
            <p>No data yet</p>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div className="mood-history">
          <h3>Mood History</h3>
          <ul>
            {history.map((entry, index) => {
              const moodObj =
                typeof entry.mood === "string"
                  ? moods.find((m) => m.label === entry.mood) || {
                      icon: "❓",
                      label: entry.mood,
                    }
                  : entry.mood;

              return (
                <li key={index}>
                  <span>{entry.date}</span> —{" "}
                  <strong>
                    {moodObj.icon} {moodObj.label}
                  </strong>
                  {entry.note && <p className="note">"{entry.note}"</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
