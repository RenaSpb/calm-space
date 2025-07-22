import { useState } from "react";
import "./Affirmations.css";

const images = Array.from({ length: 10 }, (_, i) => `/img/af${i + 1}.png`);

export default function AffirmationSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="nav-button">←</button>
      <img src={images[current]} alt={`Affirmation ${current + 1}`} className="slider-image" />
      <button onClick={nextSlide} className="nav-button">→</button>
    </div>
  );
}
