import { useState } from "react";
import "./MoodTracker.css";

const moods = [
  { id: "happy", label: "Happy", icon: "/iconsEm/happy.png" },
  { id: "sad", label: "Sad", icon: "/iconsEm/sad-face.png" },
  { id: "calm", label: "😌 Calm" },
  { id: "angry", label: "😠 Angry" },
  { id: "anxious", label: "😰 Anxious" },
  { id: "excited", label: "🤩 Excited" },
  { id: "tired", label: "😴 Tired" },
  { id: "bored", label: "😐 Bored" },
  { id: "grateful", label: "🙏 Grateful" },
  { id: "confused", label: "😕 Confused" },
  { id: "motivated", label: "🔥 Motivated" },
  { id: "lonely", label: "🥺 Lonely" }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const handleMoodSelect = (id) => {
    setSelectedMood(id);
    setNote(""); 
  };

  const handleSubmit = async () => {
  if (!selectedMood) return;

  const moodLabel = moods.find((m) => m.id === selectedMood).label;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/mood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: moodLabel,
        note: note,
      }),
    });

    if (response.ok) {
      alert("Mood saved successfully!");
      setSelectedMood(null);
      setNote("");
    } else {
      alert("Error saving mood.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error.");
  }
};

  return (
    <div className="mood-tracker">
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((mood) => (
          <div
            key={mood.id}
            className={`mood-option ${selectedMood === mood.id ? "selected" : ""}`}
            onClick={() => handleMoodSelect(mood.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleMoodSelect(mood.id)}
            aria-pressed={selectedMood === mood.id}
          >
            <img src={mood.icon} className="mood-icon" />
            {mood.label}
          </div>
        ))}
      </div>

      {selectedMood && (
        <div className="mood-note-section">
          <p>Please write a note about feeling <strong>{moods.find(m => m.id === selectedMood).label}</strong>:</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={!selectedMood}
          >
          Save Mood
          </button>
          {note && (
            <p className="mood-message">
              Your note: <em>{note}</em>
            </p>
          )}
        </div>
      )}
    </div>
  );
}