import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI with your API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Root route - confirms backend is running
app.get("/", (req, res) => {
  res.send("✅ Strike AI Backend is running!");
});

// GET /chat route - for debugging in browser
app.get("/chat", (req, res) => {
  res.send("⚠️ This endpoint only accepts POST requests with a message.");
});

// POST /chat route - handles frontend chatbot requests
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const completion = await openai.chat.completions.create({
      // You can switch to "gpt-4o-mini" if your key supports it
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: userMessage }
      ]
    });

    // Send the AI reply back to frontend
    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    // Log full error for debugging
    console.error("OpenAI API error:", error.response?.data || error.message || error);

    // Send error message to frontend
    res.status(500).json({ reply: `AI error: ${error.message}` });
  }
});

// Start server - use Render's PORT or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Strike AI server running on port ${PORT}`);
});
