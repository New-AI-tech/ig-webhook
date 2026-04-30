/**
 * Instagram Webhook Handler for Vercel Serverless Functions
 * Handles verification (GET) and incoming messages (POST)
 */

export default async function handler(req, res) {
  // Use environment variable for security, fallback to constant for initial setup
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'mySecretVerifyToken123';

  // --- Handle Webhook Verification (GET) ---
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if mode and token are sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        return res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        console.log('VERIFICATION_FAILED');
        return res.status(403).send('Verification failed');
      }
    }
  }

  // --- Handle Incoming Messages (POST) ---
  if (req.method === 'POST') {
    const body = req.body;

    // Log the incoming message payload for debugging
    // In production, you would process the message here (e.g., AI reply logic)
    console.log('Incoming Instagram Webhook:', JSON.stringify(body, null, 2));

    // Check if this is an event from an page subscription
    if (body.object === 'instagram') {
      // Return a '200 OK' response to all requests
      return res.status(200).json({ status: 'EVENT_RECEIVED' });
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      return res.status(404).json({ error: 'Not an instagram event' });
    }
  }

  // --- Handle Unsupported Methods ---
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
