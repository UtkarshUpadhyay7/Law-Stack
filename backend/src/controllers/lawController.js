const ipcData = require("../data/ipc.json");
const { getLawSummary } = require("../services/lawAIService");

exports.analyzeLaw = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("Query:", query);

    // 1️⃣ Check IPC sections first
    const match = query.match(/\b(IPC|ipc)?\s*(section)?\s*(\d{3})\b/);
    const section = match ? match[3] : null;

    if (section && ipcData[section]) {
      const law = ipcData[section];

      return res.json({
        summary: `
📘 IPC Section ${section}: ${law.title}

1. Law Overview:
${law.summary}

2. Applicability:
This law applies to individuals involved in the stated offense.

3. Common Violations:
Cheating, fraud, deception, misuse of trust.

4. Punishment / Legal Consequences:
${law.punishment}

5. What a Common Citizen Should Do:
- Avoid illegal activities
- Report the offense to police if affected
- Preserve evidence

6. Important Notes:
Law enforcement determines guilt after investigation.

7. Disclaimer:
This information is for educational purposes only and not legal advice.
`
      });
    }

    // 2️⃣ AI fallback for all other laws
    try {
      const aiText = await getLawSummary(query);

      return res.json({
        summary: aiText
      });
    } catch (aiError) {
      console.error("AI ERROR:", aiError.message);

      return res.json({
        summary: `
1. Law Overview:
This query relates to Indian cyber and IT laws.

2. Applicability:
Applies to individuals and organizations using digital systems.

3. Common Violations:
Hacking, online fraud, identity theft, cyber stalking.

4. Punishment / Legal Consequences:
Punishments vary under the IT Act, 2000 and IPC sections.

5. What a Common Citizen Should Do:
Report the crime to cyber crime cell and secure accounts.

6. Important Notes:
Cyber crimes are investigated by specialized cyber cells.

7. Disclaimer:
This is for educational purposes only and not legal advice.
`
      });
    }

  } catch (err) {
    console.error("CONTROLLER ERROR:", err.message);

    return res.status(500).json({
      summary: "Internal server error. Please try again later."
    });
  }
};
