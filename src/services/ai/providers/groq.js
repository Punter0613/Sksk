const Groq = require('groq-sdk');

// Initialize safely to prevent the server from crashing on boot if the key is missing
const groqClient = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

function buildMessages({ task, messages, options }) {
  // For estimate, we pass a raw prompt and want strict JSON back
  if (task === 'estimate' && options && options.prompt) {
    return [
      { role: 'system', content: 'Return JSON only.' },
      { role: 'user', content: options.prompt }
    ];
  }

  // Default behavior: use messages as provided
  return messages;
}

/**
 * Groq Provider (CLEAN & ISOLATED)
 * No back-references. Handles direct communication with the Groq API.
 */
async function handle({ task, messages, options = {} }) {
  if (!groqClient) {
    throw new Error('[Groq] GROQ_API_KEY is missing from environment variables.');
  }

  try {
    // Dynamically route to the heavy reasoning model or the fast model
    const activeModel =
      options.mode === 'reasoning'
        ? 'llama3-70b-8192'
        : 'llama3-8b-8192';

    const finalMessages = buildMessages({ task, messages, options });

    const completion = await groqClient.chat.completions.create({
      messages: finalMessages,
      model: activeModel,
      temperature: options.temperature ?? 0.2, // Low temp for mechanical accuracy
      max_tokens: options.maxTokens ?? 2048
    });

    return {
      provider: 'groq',
      mode: options.mode,
      ok: true,
      content: completion.choices[0]?.message?.content || '',
      usage: completion.usage
    };

  } catch (error) {
    console.error(`[Groq API Error - ${task}]:`, error.message);
    return {
      provider: 'groq',
      mode: options.mode,
      ok: false,
      error: error.message
    };
  }
}

module.exports = { handle };
