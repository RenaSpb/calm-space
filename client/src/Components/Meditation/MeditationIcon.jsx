export default function MeditationIcon({ onClick }) {
  return (
    <div 
      style={{ cursor: "pointer", fontSize: "2rem" }}
      onClick={onClick}
    >
      🧘‍♀️
      <p>Meditation</p>
    </div>
  );
}
