# 🎨 Calm Space – Frontend Client

The **frontend** of Calm Space provides a calming, user-friendly interface for mood tracking, viewing history, chatting with AI, meditating, and playing relaxing sounds.

---

## 🚀 Features

- **Mood Tracking UI**
  - Select your current mood with one click
  - Add optional notes for context
  - View mood history and trends
- **AI Supportive Chat**
  - Chat with AI in `friend` or `therapist` mode
  - Get calm and supportive responses
- **Meditation & Relaxation**
  - Guided breathing exercises (Box, 4‑7‑8, Bubble, Free breathing)
  - Background ambient sounds with toggle
  - Daily affirmations with optional images
- **Responsive Design**
  - Works seamlessly on desktop, tablet, and mobile
- **Portal-based Modals**
  - Smooth overlay pop-ups for mood entry without breaking layout

---

## 📂 Project Structure

client/
├── public/ # Static assets (icons, sounds, images)
├── src/
│ ├── components/
│ │ ├── MoodTracker.jsx # Mood tracking UI
│ │ ├── MoodChart.jsx # Mood visualization
│ │ ├── Modal.jsx # Reusable modal component (React Portal)
│ │ ├── Chat.jsx # AI chat interface
│ │ ├── SoundsPage.jsx # Relaxing sound player
│ │ ├── Breathing/ # Breathing animations
│ │ ├── Affirmations.jsx # Daily affirmations
│ ├── App.jsx # Main application entry
│ ├── index.jsx # React entry point
│ ├── MoodTracker.css # Mood tracker & modal styles
│ ├── App.css # Global styles
├── package.json
└── .env # Frontend environment variables


## ⚙️ Installation & Setup

1. **Go to the client folder**
   ```bash
   cd calm-space/client
Install dependencies

npm install
Create .env file
VITE_API_URL=http://localhost:5000
VITE_API_URL should match the URL of your backend API

Run the development server
npm run dev
Opens at http://localhost:5173

🔄 Connecting to the Backend
The frontend communicates with the backend API using the VITE_API_URL environment variable.

Example API call:
const response = await fetch(`${import.meta.env.VITE_API_URL}/mood`);
const moods = await response.json();

🛠 Tech Stack
React – UI framework
Vite – Fast build tool
Chart.js – Mood chart visualization
React Portals – Accessible modals
CSS3 / Flexbox – Responsive design

OpenAI API – AI chat (via backend)

📌 Example User Flow
Open the app

Select a mood → Modal opens → Add optional note → Save
View mood history and mood chart
Try meditation exercises
Open AI chat and talk with the assistant
Play relaxing background sounds

🔮 Planned Features
User authentication
Cloud mood storage
Additional AI personality modes
Dark mode
PWA offline support

