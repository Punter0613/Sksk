const aiClient = require('../services/ai/aiClient');

async function estimate(req, res) {
  const messages = req.body.messages;

  const result = await aiClient.run({
    task: "estimate",
    messages
  });

  res.json(result);
}

module.exports = { estimate };
