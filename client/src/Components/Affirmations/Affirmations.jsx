import { useState, useEffect } from "react";
import "./Affirmations.css";

const images = Array.from({ length: 10 }, (_, i) => `/img/af${i + 1}.jpg`);

export default function AffirmationSlider() {
  const [current, setCurrent] = useState(() =>
    Math.floor(Math.random() * images.length)
  );
  const [fadeClass, setFadeClass] = useState("fade-in");

  const showNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setFadeClass("fade-in");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeClass("");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div>
      <div className="slider-container">
        <img
          src={images[current]}
          alt={`Affirmation ${current + 1}`}
          className={`slider-image ${fadeClass}`}
        />
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
    </div>
  );
}
