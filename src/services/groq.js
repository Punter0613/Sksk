const fetch = require('node-fetch');

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function groqChat(messages, opts = {}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('[GROQ] Missing API key');
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: opts.model || 'llama-3.1-70b-versatile',
      messages,
      temperature: opts.temperature ?? 0.2,
      max_tokens: opts.max_tokens ?? 800
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[GROQ] API error: ${text}`);
  }

  return await res.json();
}

function parseGroqJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

module.exports = { groqChat, parseGroqJson };
