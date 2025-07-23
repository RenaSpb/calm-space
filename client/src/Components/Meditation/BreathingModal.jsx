import ReactDOM from "react-dom";
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

        {breathingType === "Box" && <BoxBreathing />}
        {breathingType === "4-7-8" && <FourSevenEight />}
        {breathingType === "Bubble" && <BubbleBreath />}
        {breathingType === "Free" && <FreeBreathing />}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
