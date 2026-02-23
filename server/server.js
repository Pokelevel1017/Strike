import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: req.body.message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
