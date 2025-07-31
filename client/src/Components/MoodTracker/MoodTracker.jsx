import { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodChart from "./MoodChart";
import Modal from "./Modal";

const moods = [
  { id: "happy", label: "Happy", icon: "/iconsEmoji/005-happy.png" },
  { id: "sad", label: "Sad", icon: "/iconsEmoji/004-sad.png" },
  { id: "calm", label: "Calm", icon: "/iconsEmoji/003-angel.png" },
  { id: "anxious", label: "Anxious", icon: "/iconsEmoji/001-worry.png" },
  { id: "tired", label: "Tired", icon: "/iconsEmoji/002-sleep.png" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);

  const handleMoodClick = (moodId) => {
    setSelectedMood(moodId);
  };

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

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSave = async () => {
    if (!selectedMood) return;
    const selected = moods.find((m) => m.id === selectedMood);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selected.label, note }),
      });

      if (!response.ok) throw new Error("Failed to save mood");

      await fetchHistory();
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
        <div className="panel panel-left">
          <h2 className="panel-title">How are you feeling today?</h2>
          <div className="mood-options">
            <div className="mood-row">
              {moods.slice(0, 3).map((mood) => (
                <button
                  key={mood.id}
                  className="mood-btn"
                  onClick={() => handleMoodClick(mood.id)}
                >
                  <img src={mood.icon} alt={mood.label} className="mood-icon" />
                  <span>{mood.label}</span>
                </button>
              ))}
            </div>
            <div className="mood-row center-row">
              {moods.slice(3).map((mood) => (
                <button
                  key={mood.id}
                  className="mood-btn"
                  onClick={() => handleMoodClick(mood.id)}
                >
                  <img src={mood.icon} alt={mood.label} className="mood-icon" />
                  <span>{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <h2 className="panel-title">Mood Over Time</h2>
          {history.length > 0 ? (
            <MoodChart history={history} />
          ) : (
            <p>No data yet</p>
          )}
        </div>
      </div>

      {selectedMood && (
        <Modal onClose={() => setSelectedMood(null)}>
          <button
            className="modal-close-btn"
            onClick={() => setSelectedMood(null)}
            aria-label="Close modal"
          >
            <img src="/icons/close.png" alt="Close" />
          </button>
          <h3>
              <img
              src={moods.find((m) => m.id === selectedMood)?.icon}
              alt={moods.find((m) => m.id === selectedMood)?.label}
              className="mood-icon"
              />{" "}
              {moods.find((m) => m.id === selectedMood)?.label}
          </h3>
          <textarea
            placeholder="Hey! Tell me a little bit more, if you want to..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="modal-actions">
            <button className="save-btn" onClick={handleSave}>
              <img src="/icons/done.png" alt="Save" className="save-icon" />
            </button>
          </div>
        </Modal>
      )}

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
                    <img src={moodObj.icon} alt={moodObj.label} className="mood-icon" /> {moodObj.label}
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
