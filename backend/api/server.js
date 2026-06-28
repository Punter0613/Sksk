const express = require('express');
const app = express();

app.use(express.json());

// health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'SKSK backend' });
});

// TODO: mount SKSK routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SKSK backend running on port ${PORT}`);
});
