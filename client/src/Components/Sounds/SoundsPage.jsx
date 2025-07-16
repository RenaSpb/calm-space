import "./SoundsPage.css";
import { useRef, useState, useEffect } from "react";

const sounds = [
  {
    id: 1,
    title: "Warm Campfire",
    src: "/sounds/warm-camp-fire-high-quality-176816.mp3",
    loop: true
  },
  {
    id: 2,
    title: "Walking Through Forest",
    src: "/sounds/slowly-walking-through-forest-audio_3-237672.mp3",
    loop: true
  },
  {
    id: 3,
    title: "Running Stream",
    src: "/sounds/running-stream-water-sound-239612.mp3",
    loop: true
  },
  {
    id: 4,
    title: "River Sound",
    src: "/sounds/river-sound-360204.mp3",
    loop: true
  },
  {
    id: 5,
    title: "Rain Sound",
    src: "/sounds/rain-sound-272604.mp3",
    loop: true
  },
  {
    id: 6,
    title: "Mountain Forest",
    src: "/sounds/mountain-forest-high-quality-sound-176826.mp3",
    loop: true
  },
  {
    id: 7,
    title: "Forest Sounds",
    src: "/sounds/forest-sounds-nature-233882.mp3",
    loop: true
  },
  {
    id: 8,
    title: "Forest Ambience",
    src: "/sounds/forest-ambience-296528.mp3",
    loop: true
  },
  {
    id: 9,
    title: "Fire in Night Forest",
    src: "/sounds/fire-in-the-night-forest-226199.mp3",
    loop: true
  },
  {
    id: 10,
    title: "Frogs in Forest Water",
    src: "/sounds/croaking-sound-of-frogs-in-the-forest-water-309353.mp3",
    loop: true
  },
  {
    id: 11,
    title: "Cold Snowfall",
    src: "/sounds/cold-snowfall-ambience-5-minutes-sound-effect-164512.mp3",
    loop: true
  },
  {
    id: 12,
    title: "15 Minutes Rain",
    src: "/sounds/15-minutes-of-rain-sound-for-relaxation-and-sleep-study-312863.mp3",
    loop: true
  }
];

export default function SoundsPage() {
  return (
    <div className="sounds-page">
      <h2>Relaxing Sounds</h2>
      <div className="sound-grid">
        {sounds.map((sound) => (
          <SoundPlayer
            key={sound.id}
            title={sound.title}
            src={sound.src}
            loop={sound.loop}
          />
        ))}
      </div>
    </div>
  );
}

function SoundPlayer({ title, src, loop }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(`Playback error:`, err);
          }
        });
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = parseFloat(e.target.value);
  };

  return (
    <div className="sound-item">
      <p>{title}</p>
        <button onClick={togglePlay} className="sound-button" aria-label={isPlaying ? "Pause" : "Play"}>
  {isPlaying ? (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="4" width="4" height="16" />
      <rect x="15" y="4" width="4" height="16" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  )}
</button>

      <input
        type="range"
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        onChange={handleSeek}
        className="progress-bar"
      />

      <audio ref={audioRef} src={src} loop={loop} />
    </div>
  );
}