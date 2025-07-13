// BreathingModal.jsx
import ReactDOM from "react-dom";
import BoxBreathing from "./animations/BoxBreathing";
import FourSevenEight from "./animations/FourSevenEight";
import BubbleBreath from "./animations/BubbleBreath";
import FreeBreathing from "./animations/FreeBreathing";
import "./BreathingModal.css";  

export default function BreathingModal({ breathingType, onClose }) {
  const modalContent = (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h3>{breathingType} Breathing</h3>

        {breathingType === "Box"    && <BoxBreathing />}
        {breathingType === "4-7-8"  && <FourSevenEight />}
        {breathingType === "Bubble"   && <BubbleBreath />}
        {breathingType === "Free"   && <FreeBreathing />}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
