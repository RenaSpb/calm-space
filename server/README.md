# 🪷 Calm Space API – Backend Server

This is the backend API for Calm Space, a mood tracking and supportive chat application.

It provides two main features:

	•	Mood Tracking API (create, read, update, delete moods + summaries)

	•	Supportive Chat API (chat with an AI assistant that can act as a friend or therapist)

# 🚀 Features

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

# 📂 Project Structure
.

├── db.js                 
├── index.js              
├── routes/

│   ├── chatRoutes.js     
│   └── moodRoutes.js     

├── package.json

└── .env                  

# ⚙️ Installation & Setup

1. Clone the repository
<pre>git clone<repo-url></pre>
<pre>cd calm-space-server</pre>

1. Install dependencies
<pre>npm install</pre>

2. Configure environment variables
Create a .env file in the root directory:

PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>
OPENAI_API_KEY=your_openai_api_key

1. Start the server
<pre>npm start</pre>
Server will run at: http://localhost:5000

# 📌 API Endpoints

## Chat API
   
### POST /chat

Send a message to the AI assistant

Body:
<pre>
{
  "message": "I'm feeling a bit anxious.",
  "roleType": "therapist"
}
</pre>
roleType options:

	•	friend → Friendly, casual tone
	•	therapist → Gentle, professional tone

Response:
<pre>
{
  "reply": "It’s okay to feel anxious sometimes. Can you tell me what’s been on your mind?"
}
</pre>

## Mood API
   
### POST /mood

Create a mood entry.

<pre>
{
  "mood": "Happy",
  "note": "Had a great day!"
}
</pre>

Response:

<pre>
{
  "message": "Mood saved!",
  "mood": { "id": 1, "mood": "Happy", "note": "Had a great day!",   "created_at": "2025-07-31T13:00:00Z" }
}
</pre>

### GET /mood

Fetch moods with optional filters.

Query params: startDate, endDate, type

GET /mood?startDate=2025-07-01&endDate=2025-07-31&type=Happy
PUT /mood/:id

### Update mood entry

<pre>
{
  "mood": "Calm",
  "note": "Relaxed after meditation."
}
</pre>

### DELETE /mood/:id

Delete a mood by ID

### GET /mood/summary

Fetch mood summary (weekly/monthly).

GET /mood/summary?period=month

Response example:

<pre>
[
  { "period": "2025-07", "avg_mood": 4.2 },
  { "period": "2025-06", "avg_mood": 3.8 }
]
</pre>

# 🛠 Tech Stack
	•	Node.js + Express – Backend framework
	•	PostgreSQL – Mood data storage
	•	OpenAI API – AI chat assistant
	•	CORS + dotenv – API accessibility & config management
