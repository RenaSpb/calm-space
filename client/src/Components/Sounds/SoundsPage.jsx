import "./SoundsPage.css";
import { useRef, useState, useEffect } from "react";

const sounds = [
  {
    id: 1,
    title: "Warm Campfire",
    src: "/sounds/Warm Campfire.mp3",
    image: "/img/sound/1.jpg",
    loop: true,
  },
  {
    id: 2,
    title: "Into the Woods",
    src: "/sounds/Walking Through Forest.mp3",
    image: "/img/sound/2.jpg",
    loop: true,
  },
  {
    id: 3,
    title: "Running Stream",
    src: "/sounds/Running Stream.mp3",
    image: "/img/sound/3.jpg",
    loop: true,
  },
  {
    id: 4,
    title: "River Sound",
    src: "/sounds/River Sound.mp3",
    image: "/img/sound/4.jpg",
    loop: true,
  },
  {
    id: 5,
    title: "Rain Sound",
    src: "/sounds/Rain Sound.mp3",
    image: "/img/sound/5.jpg",
    loop: true,
  },
  {
    id: 6,
    title: "Mountain Forest",
    src: "/sounds/Mountain Forest.mp3",
    image: "/img/sound/6.jpg",
    loop: true,
  },
  {
    id: 7,
    title: "Forest Sounds",
    src: "/sounds/Forest Sounds.mp3",
    image: "/img/sound/7.jpg",
    loop: true,
  },
  {
    id: 8,
    title: "Forest Ambience",
    src: "/sounds/Forest Ambience.mp3",
    image: "/img/sound/8.jpg",
    loop: true,
  },
  {
    id: 9,
    title: "Fire in Night Forest",
    src: "/sounds/Fire in Night Forest.mp3",
    image: "/img/sound/9.jpg",
    loop: true,
  },
  {
    id: 10,
    title: "Frogs in Forest Water",
    src: "/sounds/Frogs in Forest Water.mp3",
    image: "/img/sound/10.jpg",
    loop: true,
  },
  {
    id: 11,
    title: "Cold Snowfall",
    src: "/sounds/Cold Snowfall.mp3",
    image: "/img/sound/11.jpg",
    loop: true,
  },
  {
    id: 12,
    title: "15 Minutes Rain",
    src: "/sounds/15 Minutes Rain.mp3",
    image: "/img/sound/12.jpg",
    loop: true,
  },
];

export default function SoundsPage({ pauseBackgroundMusic, setNatureAudio }) {
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
            pauseBackgroundMusic={pauseBackgroundMusic}
            setNatureAudio={setNatureAudio}
            image={sound.image}
          />
        ))}
      </div>
    </div>
  );
}

function SoundPlayer({
  title,
  src,
  loop,
  activeAudio,
  image,
  setActiveAudio,
  pauseBackgroundMusic,
  setNatureAudio,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      pauseBackgroundMusic?.();

      if (activeAudio && activeAudio !== audio) {
        activeAudio.pause();
      }

      audio
        .play()
        .then(() => {
          setActiveAudio(audio);
          setIsPlaying(true);
          setNatureAudio?.(audio);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(`Playback error:`, err);
          }
        });
    }
  };

  useEffect(() => {
    if (activeAudio !== audioRef.current) {
      setIsPlaying(false);
    }
  }, [activeAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="sound-item">
      <img src={image} alt={title} className="sound-thumb" />

      <div className="sound-info">
        <p className="sound-title">{title}</p>

        <div className="sound-visualisation">
          <div className="sound-button-wrapper">
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
          </div>

          {isPlaying && (
            <div className="sound-wave-animated">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}
        </div>
        <audio ref={audioRef} src={src} loop={loop} />
      </div>
    </div>
  );
}
