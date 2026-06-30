const { aiClient } = require('./ai/aiClient');

/**
 * TEMP COMPAT LAYER
 * Routes legacy groqChat calls into AI orchestrator
 */
async function groqChat(messages, opts = {}) {
  return aiClient.run({
    provider: 'auto',
    task: 'legacy',
    messages,
    options: opts
  });
}

function parseGroqJson(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

module.exports = { groqChat, parseGroqJson };
