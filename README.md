# Instagram DM Webhook (Vercel)

A minimal, ready-to-deploy serverless webhook for the Meta Instagram Graph API.

## Features
- **Webhook Verification**: Handles `GET` requests to verify the endpoint with Meta.
- **Message Handling**: Receives `POST` requests for Instagram Direct Messages.
- **Serverless**: Optimized for Vercel's free tier (Hobby plan).

## Deployment Steps

1. **GitHub Repository**:
   - Create a new repository on GitHub.
   - Push these files to the `main` branch.

2. **Deploy to Vercel**:
   - Log in to [Vercel](https://vercel.com).
   - Click **Add New** > **Project**.
   - Import your GitHub repository.
   - (Optional) In **Environment Variables**, add:
     - `VERIFY_TOKEN`: `mySecretVerifyToken123` (or your preferred secret).
   - Click **Deploy**.

3. **Configure Meta Developer Portal**:
   - Go to your app in the [Meta App Dashboard](https://developers.facebook.com).
   - Add the **Instagram Graph API** product.
   - Go to **Webhooks** > **Instagram**.
   - Click **Edit Subscription**.
   - **Callback URL**: `https://your-project.vercel.app/api/webhook`
   - **Verify Token**: `mySecretVerifyToken123` (must match your environment variable).
   - Click **Verify and Save**.

4. **Subscribe to Fields**:
   - After verification, subscribe to the `messages` field to start receiving DMs.

## Local Development

To test locally, install the Vercel CLI:
```bash
npm install -g vercel
vercel dev
```

## Security Note
For production, ensure you use a long, random string for your `VERIFY_TOKEN` and store it as a Vercel Environment Variable.
