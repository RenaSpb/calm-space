// CircleBreathing.jsx
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./BubbleBreath.css";

export default function CircleBreathing() {
  const total = 12;
  const [cycle, setCycle] = useState(total);

  useEffect(() => {
    const id = setInterval(() => {
      setCycle((c) => (c > 1 ? c - 1 : total));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const phaseName = cycle > 6 ? "Inhale" : "Exhale";
  const secondsLeft = phaseName === "Inhale" ? cycle - 6 : cycle;

  return (
    <div className="circle-breathing-wrapper">
      <motion.div
        className="circle-breathing-shape"
        style={{ originX: "50%", originY: "50%" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: total, times: [0, 0.5, 1], ease: "linear", repeat: Infinity }}
      />
      <div className="circle-breathing-text">
        <span className="phase">{phaseName}</span>:
        <span className="seconds">{secondsLeft}</span>
      </div>
    </div>
  );
}
