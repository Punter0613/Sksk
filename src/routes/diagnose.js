const aiClient = require('../services/ai/aiClient');

async function diagnose(req, res) {
  const messages = req.body.messages;

  const result = await aiClient.run({
    task: "diagnose",
    messages
  });

  res.json(result);
}

module.exports = { diagnose };
