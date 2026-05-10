import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import { resumeContext } from '../src/data/resumeData.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Hemanth's AI portfolio assistant. You help visitors learn about Hemanth Mydugolam's professional background, skills, experience, and accomplishments.

Be conversational, helpful, and professional. Answer questions based on the resume context provided. If asked something not covered in the resume, politely note that you don't have that information and suggest contacting Hemanth directly.

Keep responses concise (2-4 sentences usually), unless the question requires detail. Use emojis sparingly for a friendly tone.

${resumeContext}`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    console.error('Claude API error:', error.message);
    res.status(500).json({
      error: 'Failed to get response. Please check your API key.',
    });
  }
});

app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
