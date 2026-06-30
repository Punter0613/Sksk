/**
 * Groq Provider (NO BACK REFERENCES)
 */

async function handle({ messages, options }) {
  // TEMP STUB until real API layer is wired cleanly
  return {
    provider: 'groq',
    mode: options.mode,
    ok: true,
    input: messages
  };
}

module.exports = { handle };
