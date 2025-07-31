🪷 Calm Space API – Backend Server

This is the backend API for Calm Space, a mood tracking and supportive chat application.
It provides two main features:
	•	Mood Tracking API (create, read, update, delete moods + summaries)
	•	Supportive Chat API (chat with an AI assistant that can act as a friend or therapist)

🚀 Features
	•	Chat API using OpenAI (gpt-4o)
	•	Supports multiple role types (friend, therapist)
	•	Returns calm, supportive responses
	•	Mood Tracking API
	•	Add, view, update, and delete moods
	•	Filter moods by date or type
	•	Generate weekly/monthly mood summaries
	•	PostgreSQL Database
	•	Stores moods with timestamps
	•	Auto-creates the moods table if it doesn’t exist
	•	Environment Configuration with .env
	•	Express Server with CORS for API consumption

📂 Project Structure
.
├── db.js                 # Database connection & table creation
├── index.js              # Entry point of the server
├── routes/
│   ├── chatRoutes.js     # OpenAI chat endpoints
│   └── moodRoutes.js     # Mood CRUD + summary endpoints
├── package.json
└── .env                  # Environment variables

⚙️ Installation & Setup

1. Clone the repository
   git clone <repo-url>
   cd calm-space-server
2. Install dependencies
   npm install
3. Configure environment variables
Create a .env file in the root directory:
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>
OPENAI_API_KEY=your_openai_api_key
4. Start the server
   npm start
   Server will run at: http://localhost:5000

📌 API Endpoints

1. Chat API
   
POST /chat
Send a message to the AI assistant.
Body:
{
  "message": "I'm feeling a bit anxious.",
  "roleType": "therapist"
}
roleType options:
	•	friend → Friendly, casual tone
	•	therapist → Gentle, professional tone
Response:
{
  "reply": "It’s okay to feel anxious sometimes. Can you tell me what’s been on your mind?"
}

1. Mood API
   
POST /mood

Create a mood entry.
{
  "mood": "Happy",
  "note": "Had a great day!"
}

Response:
{
  "message": "Mood saved!",
  "mood": { "id": 1, "mood": "Happy", "note": "Had a great day!", "created_at": "2025-07-31T13:00:00Z" }
}

GET /mood

Fetch moods with optional filters.
Query params: startDate, endDate, type
GET /mood?startDate=2025-07-01&endDate=2025-07-31&type=Happy
PUT /mood/:id
Update mood entry.
{
  "mood": "Calm",
  "note": "Relaxed after meditation."
}

DELETE /mood/:id

Delete a mood by ID.

GET /mood/summary

Fetch mood summary (weekly/monthly).
GET /mood/summary?period=month
Response example:
[
  { "period": "2025-07", "avg_mood": 4.2 },
  { "period": "2025-06", "avg_mood": 3.8 }
]

🛠 Tech Stack
	•	Node.js + Express – Backend framework
	•	PostgreSQL – Mood data storage
	•	OpenAI API – AI chat assistant
	•	CORS + dotenv – API accessibility & config management
