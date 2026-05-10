export default async function handler(req, res) {
  const { messages, systemPrompt } = req.body;

  const safeMessages = Array.isArray(messages) ? messages : [];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt || "You are a helpful assistant." },
        ...safeMessages        ]
    })
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
  res.json({ reply });
}
