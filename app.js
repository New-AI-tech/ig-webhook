const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'mySecretVerifyToken123'; // Must match dashboard

// Verification endpoint (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Message receiver (POST) - placeholder for now
app.post('/webhook', (req, res) => {
  console.log('Message received:', req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook listening on port ${PORT}`));
