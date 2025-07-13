// BoxBreathing.jsx
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import "./BoxBreathing.css";

const phases = ["Inhale", "Hold", "Exhale", "Hold"];
const durations = [4, 4, 4, 4]; 

export default function BoxBreathing() {
  const controlTop    = useAnimation();
  const controlRight  = useAnimation();
  const controlBottom = useAnimation();
  const controlLeft   = useAnimation();
  const controls = [controlTop, controlRight, controlBottom, controlLeft];

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [phaseName, setPhaseName]     = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((sec) => {
        return sec > 0 ? sec : sec;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        controls.forEach((c) => c.set({ pathLength: 0 }));
        await new Promise((r) => setTimeout(r, 20));

        for (let i = 0; i < 4; i++) {
          setPhaseName(phases[i]);
          let count = durations[i];
          setSecondsLeft(count);

          const countdown = new Promise((resolve) => {
            const interval = setInterval(() => {
              count -= 1;
              setSecondsLeft(count);
              if (count <= 0) {
                clearInterval(interval);
                resolve();
              }
            }, 1000);
          });

          const draw = controls[i].start({
            pathLength: 1,
            transition: { duration: durations[i], ease: "linear" },
          });

          await Promise.all([draw, countdown]);
        }
      }
    };
    sequence();
  }, [controlTop, controlRight, controlBottom, controlLeft]);

  return (
    <div className="box-breathing-wrapper">
      <svg viewBox="0 0 200 200" className="box-breathing-svg">
        <motion.line
          x1="50" y1="50" x2="150" y2="50"
          stroke="lightpink" strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controlTop}
        />
        <motion.line
          x1="150" y1="50" x2="150" y2="150"
          stroke="lightpink" strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controlRight}
        />
        <motion.line
          x1="150" y1="150" x2="50" y2="150"
          stroke="lightpink" strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controlBottom}
        />
        <motion.line
          x1="50" y1="150" x2="50" y2="50"
          stroke="lightpink" strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controlLeft}
        />
      </svg>

      <div className="box-breathing-text">
        <span className="phase">{phaseName}</span>
        <span className="seconds">{secondsLeft}</span>
      </div>
    </div>
  );
}
