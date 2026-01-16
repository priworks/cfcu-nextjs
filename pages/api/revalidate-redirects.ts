// pages/api/revalidate-redirects.js
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET

export default async function handler(req: any, res: any) {
  // Check for POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify the webhook signature
  const signature = req.headers[SIGNATURE_HEADER_NAME]
  const body = await readBody(req) // Read the body into a string
  if (!isValidSignature(body, signature, secret || '')) {
    return res.status(401).json({ message: 'Invalid signature' })
  }

  try {
    // Trigger Vercel Deploy Hook
    const response = await fetch(process.env.DEPLOY_HOOK as string, {
      method: 'POST',
    })

    if (response.ok) {
      return res.json({ redeployed: true, now: Date.now() })
    } else {
      throw new Error('Failed to trigger deploy')
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send('Error triggering redeploy')
  }
}

// Helper function to read the request body
async function readBody(readable: any) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}
