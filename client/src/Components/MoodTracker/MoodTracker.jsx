import { useState } from "react";
import "./MoodTracker.css"; 

const moods = [
  { id: "happy", label: "Happy", icon: "😊" },
  { id: "sad", label: "Sad", icon: "😢" },
  { id: "calm", label: "Calm", icon: "😌" },
  { id: "anxious", label: "Anxious", icon: "😰" },
  { id: "tired", label: "Tired", icon: "😴" }
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);

  const handleMoodClick = (moodId) => {
    setSelectedMood(moodId);
  };

  const handleSave = () => {
    if (!selectedMood) return;

    const newEntry = {
      mood: moods.find((m) => m.id === selectedMood),
      note,
      date: new Date().toLocaleString(),
    };

    setHistory([newEntry, ...history]);
    setSelectedMood(null);
    setNote("");
  };

  
  return (
    <div className="mood-tracker">
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-btn ${selectedMood === mood.id ? "selected" : ""}`}
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
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      )}

      {history.length > 0 && (
        <div className="mood-history">
          <h3>Mood History</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <span>{entry.date}</span> — <strong>{entry.mood.icon} {entry.mood.label}</strong>
                {entry.note && <p className="note">"{entry.note}"</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
