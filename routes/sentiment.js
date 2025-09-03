const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

console.log("OPENAI_API_KEY in sentiment route:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/sentiment", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });

  try {
    const prompt = `
Analyze the sentiment of this text and respond with one word only: Positive, Neutral, or Negative.

Text: "${text}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const sentiment = completion.choices[0].message.content.trim();

    res.json({ sentiment });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to analyze sentiment" });
  }
});

module.exports = router;
