import "./SoundsPage.css";
import { useRef, useState, useEffect } from "react";

const sounds = [
  {
    id: 1,
    title: "Warm Campfire",
    src: "/sounds/Warm Campfire.mp3",
    loop: true,
  },
  {
    id: 2,
    title: "Walking Through Forest",
    src: "/sounds/Walking Through Forest.mp3",
    loop: true,
  },
  {
    id: 3,
    title: "Running Stream",
    src: "/sounds/Running Stream.mp3",
    loop: true,
  },
  {
    id: 4,
    title: "River Sound",
    src: "/sounds/River Sound.mp3",
    loop: true,
  },
  {
    id: 5,
    title: "Rain Sound",
    src: "/sounds/Rain Sound.mp3",
    loop: true,
  },
  {
    id: 6,
    title: "Mountain Forest",
    src: "/sounds/Mountain Forest.mp3",
    loop: true,
  },
  {
    id: 7,
    title: "Forest Sounds",
    src: "/sounds/Forest Sounds.mp3",
    loop: true,
  },
  {
    id: 8,
    title: "Forest Ambience",
    src: "/sounds/Forest Ambience.mp3",
    loop: true,
  },
  {
    id: 9,
    title: "Fire in Night Forest",
    src: "/sounds/Fire in Night Forest.mp3",
    loop: true,
  },
  {
    id: 10,
    title: "Frogs in Forest Water",
    src: "/sounds/Frogs in Forest Water.mp3",
    loop: true,
  },
  {
    id: 11,
    title: "Cold Snowfall",
    src: "/sounds/Cold Snowfall.mp3",
    loop: true,
  },
  {
    id: 12,
    title: "15 Minutes Rain",
    src: "/sounds/15 Minutes Rain.mp3",
    loop: true,
  },
];

export default function SoundsPage() {
  const [activeAudio, setActiveAudio] = useState(null);

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
            activeAudio={activeAudio}
            setActiveAudio={setActiveAudio}
          />
        ))}
      </div>
    </div>
  );
}

function SoundPlayer({ title, src, loop, activeAudio, setActiveAudio }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (activeAudio && activeAudio !== audio) {
        activeAudio.pause();
      }

      audio
        .play()
        .then(() => {
          setActiveAudio(audio);
          setIsPlaying(true);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(`Playback error:`, err);
          }
        });
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
      <button
        onClick={togglePlay}
        className="sound-button"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
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