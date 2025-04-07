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

app.post("/chat", async (req, res) => {
    try {
      const messages = req.body.messages || [];
      console.log("Messages received:", messages); // Log incoming messages
  
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768", // Or other Groq models
          messages
        })
      });
  
      const data = await response.json();
      console.log("Groq response:", data); // Log Groq API response
  
      if (data.choices?.[0]?.message) {
        res.json(data.choices[0].message);
      } else {
        res.status(500).json({ error: "No response from Groq." });
      }
    } catch (err) {
      console.error("Error during API call:", err); // Log the error
      res.status(500).json({ error: "Groq API error", details: err.message });
    }
});
  
app.get("/", (_, res) => {
  res.send("Groq Chat API is live.");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
