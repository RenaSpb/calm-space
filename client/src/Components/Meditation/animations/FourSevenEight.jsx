// FourSevenEightTriangle.jsx
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import "./FourSevenEightTriangle.css";

export default function FourSevenEightTriangle() {
  const control1 = useAnimation();
  const control2 = useAnimation();
  const control3 = useAnimation();

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [phaseName, setPhaseName] = useState("");

  const durations = [4, 7, 8];
  const names = ["Inhale", "Hold", "Exhale"];
  const controls = [control1, control2, control3];

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        controls.forEach((c) => c.set({ pathLength: 0 }));
        await new Promise((r) => setTimeout(r, 20));

        for (let i = 0; i < 3; i++) {
          setPhaseName(names[i]);

          const anim = controls[i].start({
            pathLength: 1,
            transition: { duration: durations[i], ease: "linear" },
          });

          const countdown = new Promise((resolve) => {
            let count = durations[i];
            setSecondsLeft(count);
            const interval = setInterval(() => {
              count -= 1;
              setSecondsLeft(count);
              if (count <= 0) {
                clearInterval(interval);
                resolve();
              }
            }, 1000);
          });

          await Promise.all([anim, countdown]);
        }
      }
    };

    sequence();
  }, [control1, control2, control3]);

  return (
    <div className="triangle-wrapper">
      <svg viewBox="0 0 100 100" className="triangle-svg">
        <motion.line
          x1="50"
          y1="10"
          x2="90"
          y2="80"
          stroke="lightpink"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={control1}
        />
        <motion.line
          x1="90"
          y1="80"
          x2="10"
          y2="80"
          stroke="lightpink"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={control2}
        />
        <motion.line
          x1="10"
          y1="80"
          x2="50"
          y2="10"
          stroke="lightpink"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={control3}
        />
      </svg>

      <div className="countdown">
        <span className="phase">{phaseName}</span>:
        <span className="seconds"> {secondsLeft}</span>
      </div>
    </div>
  );
}
