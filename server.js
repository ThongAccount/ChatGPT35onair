import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins (for now, more restrictive options are possible later)
app.use(cors({ origin: '*' }));

// Your Groq API key
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

app.use(express.json());

app.post("/chat", (req, res) => {
    try {
      const messages = req.body.messages || [];
      console.log("Received messages:", messages);
  
      // Test response directly without calling Groq
      if (messages.length > 0) {
        res.json({ content: "Hello! How can I help?" });
      } else {
        res.status(400).json({ error: "No messages provided." });
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
});
    
app.get("/", (_, res) => {
  res.send("Groq Chat API is live.");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
