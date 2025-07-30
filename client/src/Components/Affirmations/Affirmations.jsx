import { useState, useEffect } from "react";
import "./Affirmations.css";

const affirmations = [
  "I am calm and grounded.",
  "I deserve to feel good.",
  "This moment is enough.",
  "I trust myself.",
  "I am safe here and now.",
  "I welcome peace into my life.",
  "I breathe in strength, exhale tension.",
  "My body is relaxed, my mind is clear.",
  "I let go of what I can't control.",
  "I am resilient and capable."
];

export default function AffirmationSlider() {
  const [current, setCurrent] = useState(() =>
    Math.floor(Math.random() * affirmations.length)
  );
  const [fadeClass, setFadeClass] = useState("fade-in");

  const showNext = () => {
    setCurrent((prev) => (prev + 1) % affirmations.length);
    setFadeClass("fade-in");
  };

  useEffect(() => {
    const timeout = setTimeout(() => setFadeClass(""), 600);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div className="slider-container">
      <div className="sticker">
        <p className={`sticker-text ${fadeClass}`}>
          {affirmations[current]}
        </p>
      </div>

      <button
        onClick={showNext}
        className="random-button"
        aria-label="Next affirmation"
      >
        <img
          src="/icons/refresh.png"
          alt="Next icon"
          className="refresh-icon"
        />
      </button>
    </div>
  );
}
