import "./VideosPage.css";

export default function VideosPage() {
  const videos = [
    {
      id: "SMgb9LJmkWc",
      title: "1 Hour of Gentle Ambient & Classical Lullabies"
    },
    {
      id: "T-BH-Pk7YwQ",
      title: "5 Minutes of Peace for Meditation"
    },
    {
      id: "Cf2NGcHXoK4",
      title: "2 Hours of Rain and Thunderstorm Sounds"
    },
    {
      id: "le75RBN2kNU",
      title: "Techno Flow – 30 min Driving Beat for Work, Movement, Mind"
    },
    {
      id: "HZKI6UQF8nQ",
      title: "10 Hours of White Noise for Sleep, Focus, and Calm"
    },
    {
      id: "q18asXPDLEo",
      title: "1 Hour of Chill Ambience"
    },
    {
      id: "Pk809gbPMdw",
      title: "1 Hour Calm, Meditation, Relaxation Music"
    },
    {
      id: "c5X2P7GNUD4",
      title: "30 Minutes of Forest Ambience with Birdsong"
    },
    {
      id: "uVbIX7B6BsA",
      title: "2 Hours of Soothing Fireplace Sounds"
    }
  ];

  return (
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
  );
}
