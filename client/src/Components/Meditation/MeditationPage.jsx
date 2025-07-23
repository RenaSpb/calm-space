import { useState } from "react";
import BreathingModal from "./BreathingModal";
import "./MeditationPage.css";

export default function MeditationPage({ bgPlaying, toggleBgMusic }) {
  const [selectedBreathing, setSelectedBreathing] = useState(null);

  const handleOpen = (type) => {
    setSelectedBreathing(type);
  };

  const handleClose = () => {
    setSelectedBreathing(null);
  };

  return (
    <div className="page-fade">
      <div className="meditation-page">
        <h2>Select Breathing Technique</h2>
        <div className="text-and-meditations">
          <div className="left-block">
            <img src="/icons/breathing.png" alt="Meditation icon" />
            <p>
              Breathing calms your nerves because slow, deep breaths lower
              stress, slow your heartbeat, and help you focus on your body
              instead of anxious thoughts. This page has simple breathing
              techniques to help you relax and feel calm.
            </p>
          </div>
          <div className="breathing-grid">
            <div className="meditation-block">
              <button onClick={() => handleOpen("Box")}>
                <strong>Box Breathing</strong>
                <img
                  src="/icons/square.png"
                  alt="Box icon"
                  className="meditation-icon"
                />
                Inhale 4s, hold 4s, exhale 4s, hold 4s.
              </button>
            </div>

            <div className="meditation-block">
              <button onClick={() => handleOpen("4-7-8")}>
                <strong>4-7-8</strong>
                <img
                  src="/icons/triangle.png"
                  alt="Box icon"
                  className="meditation-icon"
                />
                Inhale 4s, hold 7s, exhale 8s.
              </button>
            </div>

            <div className="meditation-block">
              <button onClick={() => handleOpen("Bubble")}>
                <strong>Bubble Breath</strong>
                <img
                  src="/icons/round.png"
                  alt="Box icon"
                  className="meditation-icon"
                />
                Deep belly breathing.
              </button>
            </div>

            <div className="meditation-block">
              <button onClick={() => handleOpen("Free")}>
                <strong>Free Breathing</strong>
                <img
                  src="/icons/wave.png"
                  alt="Box icon"
                  className="meditation-icon"
                />
                Breathe in your own rhythm.
              </button>
            </div>
          </div>
        </div>

        {selectedBreathing && (
          <BreathingModal
            breathingType={selectedBreathing}
            onClose={handleClose}
            toggleBgMusic={toggleBgMusic}
            bgPlaying={bgPlaying}
          />
        )}
      </div>
    </div>
  );
}
