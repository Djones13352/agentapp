// api/chat.js
// Vercel serverless function — this runs on Vercel's servers, never in the browser.
// The Anthropic API key lives ONLY here (as an environment variable), so it's
// never exposed to anyone viewing the site's source or network requests.
//
// The frontend calls THIS endpoint (/api/chat) instead of api.anthropic.com directly.
// This file forwards the request to Anthropic, attaches the secret key, and
// returns the response back to the browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is not configured with an API key yet." });
  }

  try {
    const { system, messages, max_tokens } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: max_tokens || 1000,
        system: system || undefined,
        messages: messages || [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return res.status(response.status).json({ error: data?.error?.message || "Anthropic API request failed." });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Something went wrong reaching the AI service." });
  }
}
