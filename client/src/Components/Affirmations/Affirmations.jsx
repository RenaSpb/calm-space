import { useState, useEffect } from "react";
import "./Affirmations.css";

const images = Array.from({ length: 10 }, (_, i) => `/img/af${i + 1}.png`);

export default function AffirmationSlider() {
  const [current, setCurrent] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  const showRandom = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * images.length);
    } while (newIndex === current);
    setCurrent(newIndex);
    setFadeClass("fade-in");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeClass("");
    }, 300);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div className="slider-container">
      <img
        src={images[current]}
        alt={`Affirmation ${current + 1}`}
        className={`slider-image ${fadeClass}`}
      />
      <button onClick={showRandom} className="random-button" aria-label="New affirmation">
        <img src="/icons/refresh.png" alt="Refresh icon" className="refresh-icon" />
      </button>
    </div>
  );
}
