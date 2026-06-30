/**
 * Provider Router (CLEAN - NO CIRCULAR DEPENDENCIES)
 */

const groqProvider = require('./providers/groq');

const ROUTES = Object.freeze({
  diagnose: { provider: 'groq', mode: 'reasoning' },
  estimate: { provider: 'groq', mode: 'structured' },
  translate: { provider: 'groq', mode: 'fast' }
});

function selectRoute(task) {
  return ROUTES[task] || ROUTES.estimate;
}

async function route({ task, messages, options = {} }) {
  const decision = selectRoute(task);

  // direct provider call ONLY (no legacy layer)
  if (decision.provider === 'groq') {
    return groqProvider.handle({
      task,
      messages,
      options: {
        ...options,
        mode: decision.mode,
        _deterministic: true
      }
    });
  }

  throw new Error('[AI] Unknown provider');
}

module.exports = { route };
