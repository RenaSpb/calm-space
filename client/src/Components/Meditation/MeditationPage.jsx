import { useState } from "react";
import BreathingModal from "./BreathingModal";
import "./MeditationPage.css";

export default function MeditationPage() {
  const [selectedBreathing, setSelectedBreathing] = useState(null);

  const handleOpen = (type) => {
    setSelectedBreathing(type);
  };

  const handleClose = () => {
    setSelectedBreathing(null);
  };

  return (
    <div className="meditation-page">
      <h2>Select Breathing Technique</h2>
      <div className="breathing-grid">
        <div className="meditation-block">
          <button onClick={() => handleOpen("Box")}>Box Breathing</button>
          <p>
            Inhale 4s, hold 4s, exhale 4s, hold 4s. <br /> Calms nerves, increases focus.
          </p>
        </div>

        <div className="meditation-block">
          <button onClick={() => handleOpen("4-7-8")}>4-7-8</button>
          <p>Inhale 4s, hold 7s, exhale 8s. <br /> Helps fall asleep, relaxes body.</p>
        </div>

        <div className="meditation-block">
          <button onClick={() => handleOpen("Bubble")}>Bubble Breath</button>
          <p>Deep belly breathing. Reduces stress, soothes anxiety.</p>
        </div>

        <div className="meditation-block">
          <button onClick={() => handleOpen("Free")}>Free Breathing</button>
          <p>Breathe naturally. Good for gentle mindfulness anytime.</p>
        </div>
      </div>

      {selectedBreathing && (
        <BreathingModal
          breathingType={selectedBreathing}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
