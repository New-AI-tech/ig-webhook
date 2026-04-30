export default async function handler(req, res) {
  // Instagram sends the authorization code as a query parameter
  const { code, error, error_reason, error_description } = req.query;

  if (error) {
    console.error('OAuth error:', error, error_reason, error_description);
    return res.status(400).send(`Authorization failed: ${error_description}`);
  }

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  console.log('Received authorization code:', code);

  // Here you would exchange the code for an access token
  // For now, just display the code (for testing)
  res.status(200).send(`
    <h1>Authorization successful!</h1>
    <p>Code: ${code}</p>
    <p>You can close this window.</p>
  `);
}
