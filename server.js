import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { OpenAI } from "openai";

config(); // Load .env in local dev

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages || [];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json(response.choices[0].message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.get("/", (_, res) => {
  res.send("ChatGPT Proxy is running.");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
