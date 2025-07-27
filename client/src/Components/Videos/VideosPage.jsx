import "./VideosPage.css";

export default function VideosPage() {
  const videos = [
    {
      id: "SMgb9LJmkWc",
      title: "Gentle Ambient",
    },
    {
      id: "T-BH-Pk7YwQ",
      title: "Peace for Meditation",
    },
    {
      id: "Cf2NGcHXoK4",
      title: "Thunderstorm Sounds",
    },
    {
      id: "9Qwp89Zw8HU",
      title: "Relaxing Piano",
    },
    {
      id: "HZKI6UQF8nQ",
      title: "White Noise for Sleep",
    },
    {
      id: "q18asXPDLEo",
      title: "Chill Ambience",
    },
    {
      id: "Pk809gbPMdw",
      title: "Relaxation Music",
    },
    {
      id: "c5X2P7GNUD4",
      title: "Forest Ambience",
    },
    {
      id: "uVbIX7B6BsA",
      title: "Fireplace Sounds",
    },
    {
      id: "J4d-a7dVtiQ",
      title: "Rain Ambience",
    },
  ];

  return (
    <div className="page-fade">
      <div className="videos-page">
        <h2>Relaxing Videos</h2>
        <div className="video-grid">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-item"
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
              />
              <p>{video.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
