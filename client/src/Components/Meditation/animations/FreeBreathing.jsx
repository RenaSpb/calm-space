// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./FreeBreathing.css";

export default function FreeBreathing() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <motion.div
  className="gradient-ball"
  animate={{
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    scale: [1, 1.05, 1]  // легкий пульс
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }}
/>
  <p>Just breathe in your own rhythm</p>
    </div>
  );
}
