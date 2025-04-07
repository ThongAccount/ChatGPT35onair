// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = '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';

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama2-70b-4096',
        messages: [
          {
            role: 'system',
            content: 'You are a math expert assistant. You solve math equations step by step.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error from Groq:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with Groq API.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
