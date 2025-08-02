import { useState, useEffect } from "react";
import "./MoodTracker.css";
import MoodChart from "./MoodChart";
import Modal from "./Modal";

const moods = [
  { id: "happy", label: "Happy", icon: "/iconsEmoji/005-happy1.png" },
  { id: "sad", label: "Sad", icon: "/iconsEmoji/004-sad1.png" },
  { id: "calm", label: "Calm", icon: "/iconsEmoji/003-angel1.png" },
  { id: "anxious", label: "Anxious", icon: "/iconsEmoji/001-worry1.png" },
  { id: "tired", label: "Tired", icon: "/iconsEmoji/002-sleep1.png" },
];

const moodScale = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Tired: 2,
  Sad: 1,
  Anxious: 0,
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null); // for mood ID selection
  const [editingEntry, setEditingEntry] = useState(null); // store entry being edited (or null)
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]); // raw fetched data
  const [summary, setSummary] = useState(null);

  // States for sorting and filtering
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterMood, setFilterMood] = useState("");

  const handleMoodClick = (moodId) => {
    setSelectedMood(moodId);
    setEditingEntry(null); // new mood, no editing entry
    setNote("");
  };

  // Open modal to edit existing mood entry
  const handleEditClick = (entry) => {
    setEditingEntry(entry);
    setSelectedMood(
      moods.find(
        (m) => m.label.toLowerCase() === entry.mood.label.toLowerCase()
      )?.id || null
    );
    setNote(entry.note || "");
  };

  // Fetch all moods from backend (no filtering or sorting here)
  const fetchHistory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mood`);
      if (!response.ok) throw new Error("Failed to fetch moods");
      const data = await response.json();

      setHistory(
        Array.isArray(data)
          ? data.map((entry) => ({
              id: entry.id, // make sure to keep id for updates
              mood: moods.find(
                (m) =>
                  m.label.toLowerCase() === (entry.mood || "").toLowerCase()
              ) || {
                icon: "❓",
                label: entry.mood || "Unknown",
              },
              note: entry.note,
              date: entry.created_at ? new Date(entry.created_at) : new Date(0),
            }))
          : []
      );
    } catch (error) {
      console.error("Error loading mood history:", error);
      setHistory([]);
    }
  };

  // Calculate summary locally from history
  function calculateSummary(history) {
    if (!history.length) {
      return { topMood: "N/A", average: "N/A", totalEntries: 0 };
    }

    const freq = {};
    let totalScore = 0;

    history.forEach(({ mood }) => {
      const label = typeof mood === "string" ? mood : mood.label;
      freq[label] = (freq[label] || 0) + 1;
      totalScore += moodScale[label] ?? 3;
    });

    const topMood = Object.entries(freq).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["N/A", 0]
    )[0];

    const average = (totalScore / history.length).toFixed(1);

    return {
      topMood,
      average,
      totalEntries: history.length,
    };
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    setSummary(calculateSummary(history));
  }, [history]);

  const filteredAndSortedHistory = history
    .filter((entry) => {
      if (!filterMood) return true;
      return entry.mood.label.toLowerCase() === filterMood.toLowerCase();
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.date - b.date;
      } else {
        return b.date - a.date;
      }
    });

  // Save new mood or update existing mood entry
  const handleSave = async () => {
    if (!selectedMood) return;

    const selected = moods.find((m) => m.id === selectedMood);

    try {
      let response;
      if (editingEntry) {
        // Update existing mood entry (PUT)
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/mood/${editingEntry.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mood: selected.label, note }),
          }
        );
      } else {
        // Create new mood entry (POST)
        response = await fetch(`${import.meta.env.VITE_API_URL}/mood`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mood: selected.label, note }),
        });
      }

      if (!response.ok) throw new Error("Failed to save mood");

      await fetchHistory();
      setSelectedMood(null);
      setEditingEntry(null);
      setNote("");
    } catch (error) {
      console.error("Error saving mood:", error);
      alert("Could not save mood. Please try again.");
    }
  };

  return (
    <div className="page-fade">
      <div className="dashboard">
        {/* Left Panel - Mood Selection */}
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
          {/* Summary Section */}
          <div className="mood-summary">
            {summary ? (
              <>
                <p>
                  <strong>Top:</strong> {summary.topMood || " "}
                </p>
                <p>
                  <strong>Avg:</strong>{" "}
                  {summary.average ? Number(summary.average).toFixed(1) : " "}
                </p>
                <p>
                  <strong>Entries:</strong> {summary.totalEntries ?? 0}
                </p>
              </>
            ) : (
              <p>No summary available yet</p>
            )}
          </div>
        </div>

        {/* Right Panel - Chart */}
        <div className="panel">
          <h2 className="panel-title">Mood Over Time</h2>
          {filteredAndSortedHistory.length > 0 ? (
            <MoodChart history={filteredAndSortedHistory} />
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {/* Controls for Sorting & Filtering */}
      {/* <div className="controls">
        <div className="sort-controls">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="icon-select sort-select"
          >
            <option value="desc">New</option>
            <option value="asc">Old</option>
          </select>
        </div>

        <div className="filter-controls">
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="icon-select filter-select"
          >
            <option value="">All</option>
            {moods.map((m) => (
              <option key={m.id} value={m.label}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Modal for adding or editing mood */}
      {(selectedMood || editingEntry) && (
        <Modal
          onClose={() => {
            setSelectedMood(null);
            setEditingEntry(null);
            setNote("");
          }}
        >
          <button
            className="modal-close-btn"
            onClick={() => {
              setSelectedMood(null);
              setEditingEntry(null);
              setNote("");
            }}
            aria-label="Close modal"
          >
            <img src="/icons/close.png" alt="Close" />
          </button>
          <h3>
            <img
              src={moods.find((m) => m.id === selectedMood)?.icon}
              alt={moods.find((m) => m.id === selectedMood)?.label}
              className="mood-icon"
            />
            &nbsp;
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

      {/* Mood History */}
<div className="mood-history">
  <div className="mood-history-header">
    <h3>Mood History</h3>

    <div className="history-controls">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="icon-select sort-select"
      >
        <option value="desc">New</option>
        <option value="asc">Old</option>
      </select>

      <select
        value={filterMood}
        onChange={(e) => setFilterMood(e.target.value)}
        className="icon-select filter-select"
      >
        <option value="">All</option>
        {moods.map((m) => (
          <option key={m.id} value={m.label}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  </div>

  {filteredAndSortedHistory.length > 0 ? (
    <ul>
      {filteredAndSortedHistory.map((entry, index) => (
        <li key={index}>
          <span>{entry.date.toLocaleString()}</span>
          <strong>
            <img
              src={entry.mood.icon}
              alt={entry.mood.label}
              className="mood-icon"
            />{" "}
            {entry.mood.label}
          </strong>
          {entry.note && <p className="note">"{entry.note}"</p>}
          <button
            onClick={() => handleEditClick(entry)}
            className="edit-btn"
          >
            <img src="icons/edit.png" alt="Edit" className="edit-icon" />
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No mood history available</p>
  )}
</div>


    </div>
  );
};

export default MoodTracker;
