const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { message, roleType } = req.body;

  let systemPrompt = "You are a calm and supportive assistant."; // default

  if (roleType === "friend") {
    systemPrompt = "You're a warm and caring friend. Speak casually and kindly, like someone who truly cares.";
  } else if (roleType === "therapist") {
    systemPrompt = "You're a gentle and professional therapist. Help the user explore their emotions with empathy and understanding.";
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    if (error.status === 429) {
      res.status(429).json({ error: "Rate limit exceeded or insufficient quota." });
    } else {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
});

module.exports = router;
