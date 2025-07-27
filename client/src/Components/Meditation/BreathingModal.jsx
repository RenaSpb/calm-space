import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import BoxBreathing from "./animations/BoxBreathing";
import FourSevenEight from "./animations/FourSevenEight";
import BubbleBreath from "./animations/BubbleBreath";
import FreeBreathing from "./animations/FreeBreathing";
import "./BreathingModal.css";

export default function BreathingModal({
  breathingType,
  onClose,
  toggleBgMusic,
  bgPlaying,
}) {
  const [countdown, setCountdown] = useState(3);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowAnimation(true), 500); 
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const renderBreathingAnimation = () => {
    switch (breathingType) {
      case "Box":
        return <BoxBreathing />;
      case "4-7-8":
        return <FourSevenEight />;
      case "Bubble":
        return <BubbleBreath />;
      case "Free":
        return <FreeBreathing />;
      default:
        return null;
    }
  };

  const modalContent = (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="header">
          <h3>{breathingType} Breathing</h3>
          <button
            className="topbar-button"
            onClick={toggleBgMusic}
            title={
              bgPlaying
                ? "Turn off background music"
                : "Turn on background music"
            }
          >
            <img
              src={bgPlaying ? "/icons/sound-on.png" : "/icons/sound-off.png"}
              alt="Background music"
              style={{ width: "32px", height: "32px" }}
            />
          </button>
        </div>

        <div className="animation-area">
          {!showAnimation ? (
            <div className="countdown-wrapper">
              <div className="countdown-label">Inhale begins in...</div>
              <div className="countdown-text">{countdown}</div>
            </div>
          ) : (
            renderBreathingAnimation()
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
