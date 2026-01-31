const OpenAI = require("openai");
const { retrieveIpcSection } = require("./ipcRetriever");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Get law summary using RAG + AI (with fallback)
 */
async function getLawSummary(query) {
  // 🔍 STEP 1: Retrieve relevant IPC section using RAG
  const retrieved = retrieveIpcSection(query, 1)[0];

  // ❌ Case 1: Section explicitly requested but not found
  if (retrieved.error) {
    return {
      summary: `⚠️ ${retrieved.error}`,
      disclaimer: "⚠️ This is not legal advice.",
    };
  }

  // 🔒 Safety check
  if (!retrieved || !retrieved.text) {
    return {
      summary: "⚠️ Unable to retrieve the requested law section.",
      disclaimer: "⚠️ This is not legal advice.",
    };
  }

  // 🟢 STEP 2: Try AI-based explanation (GROUNDED)
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are LawLens AI. Explain Indian laws in very simple language for common citizens. " +
            "Use ONLY the provided legal text. Do NOT add new facts. Do NOT give legal advice.",
        },
        {
          role: "user",
          content: `Explain the following law in simple terms:\n\n${retrieved.text}`,
        },
      ],
      temperature: 0.2,
    });

    return {
      summary: completion.choices[0].message.content,
      disclaimer:
        "⚠️ This explanation is for educational purposes only and is not legal advice.",
    };
  } catch (error) {
    // 🔴 STEP 3: FALLBACK MODE (quota exceeded / API failure)
    console.error("AI ERROR:", error.message);

    return {
      summary:
        `${retrieved.text}\n\n` +
        "📌 Simple explanation: This section describes the offence and the punishment prescribed under Indian law.",
      disclaimer:
        "⚠️ AI explanation unavailable at the moment. Showing official law text only. This is not legal advice.",
    };
  }
}

module.exports = { getLawSummary };
