const { getLawSummary } = require("../services/lawAIService");

exports.analyzeLaw = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        summary: "Query is required",
        disclaimer: "This is not legal advice.",
      });
    }

    const result = await getLawSummary(query);

    res.json({
      query,
      summary: result.summary,
      disclaimer: result.disclaimer,
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      summary: "AI service temporarily unavailable.",
      disclaimer: "This is not legal advice.",
    });
  }
};
