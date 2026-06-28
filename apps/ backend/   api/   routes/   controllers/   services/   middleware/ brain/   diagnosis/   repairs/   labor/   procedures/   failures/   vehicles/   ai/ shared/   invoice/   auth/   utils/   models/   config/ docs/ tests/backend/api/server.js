const express = require('express');
const app = express();

app.use(express.json());

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// TODO: mount routes from backend/routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SKSK backend running on port ${PORT}`);
});
