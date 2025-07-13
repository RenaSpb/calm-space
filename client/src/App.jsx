import MeditationIcon from "./Components/Meditation/MeditationIcon";
import MeditationPage from "./Components/Meditation/MeditationPage";
import { useState } from "react";


export default function App() {
  const [showMeditation, setShowMeditation] = useState(false);
 return (
    <div>
      {!showMeditation && (
        <MeditationIcon onClick={() => setShowMeditation(true)} />
      )}
      {showMeditation && <MeditationPage />}
    </div>
  );
}
