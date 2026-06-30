/**
 * LEGACY COMPAT LAYER (SAFE)
 * Must NOT participate in routing graph
 */

const { route } = require('./ai/providerRouter');

async function groqChat(messages, opts = {}) {
  return route({
    task: opts.task || 'estimate',
    messages,
    options: opts
  });
}

function parseGroqJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

module.exports = { groqChat, parseGroqJson };
