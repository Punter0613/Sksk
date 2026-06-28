const express = require('express');
const router = express.Router();

// Simple placeholder route for now
router.get('/ping', (req, res) => {
  res.json({ ok: true, service: 'ProTech' });
});

// TODO: add estimate, diagnosis, invoice routes here

module.exports = router;
