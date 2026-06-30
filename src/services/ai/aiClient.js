const { route } = require('./providerRouter');

/**
 * AI Client (Production Hardened)
 * - Fail fast
 * - No silent fallback
 */

async function run({ task, messages, options = {} }) {
  if (!task) throw new Error('[AI] Missing task');
  if (!Array.isArray(messages)) throw new Error('[AI] Messages must be array');

  return route({
    task,
    messages,
    options
  });
}

async function legacyRun(messages, options = {}) {
  return run({
    task: options.task || 'estimate',
    messages,
    options
  });
}

module.exports = { run, legacyRun };
