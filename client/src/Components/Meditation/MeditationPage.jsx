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

    <div>
      <button onClick={() => handleOpen("Box")}>Box Breathing</button>
      <p>4-4-4-4: inhale, hold, exhale, hold. Calms nerves, increases focus.</p>
    </div>

    <div>
      <button onClick={() => handleOpen("4-7-8")}>4-7-8</button>
      <p>Inhale 4s, hold 7s, exhale 8s. Helps fall asleep, relaxes body.</p>
    </div>

    <div>
      <button onClick={() => handleOpen("Bubble")}>Bubble Breath</button>
      <p>Deep belly breathing. Reduces stress, soothes anxiety.</p>
    </div>

    <div>
      <button onClick={() => handleOpen("Free")}>Free Breathing</button>
      <p>Breathe naturally. Good for gentle mindfulness anytime.</p>
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