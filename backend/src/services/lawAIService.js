const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getLawSummary(query) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are Law Lens AI, built for a final year engineering project.

For ANY law-related query, respond in the following FORMAT only:

1. Law Overview (in very simple language)
2. Applicability (who it applies to)
3. Common Violations
4. Punishment / Legal Consequences
5. What a Common Citizen Should Do
6. Important Notes
7. Disclaimer (This is not legal advice)

Keep the explanation brief, clear, and easy to understand.
Do NOT give professional legal advice.
`
      },
      {
        role: "user",
        content: query
      }
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { getLawSummary };
