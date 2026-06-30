const router = require('express').Router();
const aiClient = require('../services/ai/aiClient');

router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'No text provided' });

    const prompt = `
You are an expert automotive technician.
Translate the customer's plain language car issue into precise mechanic terminology.

Return JSON ONLY:
{
  "translated": "technical mechanic description",
  "keywords": ["term1", "term2"]
}

Customer: "${text}"
`;

    const result = await aiClient.run({
      task: "translate",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const raw = result?.content || result?.output || result?.text || "";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = null;
    }

    res.json({
      translated: parsed?.translated || text,
      keywords: parsed?.keywords || []
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
