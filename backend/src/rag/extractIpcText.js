const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

async function extractIpcText() {
  try {
    const pdfPath = path.join(__dirname, "../../rag-data/ipc.pdf");
    const outputPath = path.join(__dirname, "../../rag-index/ipc-raw.txt");

    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    const cleanText = data.text.replace(/\s+/g, " ").trim();

    fs.writeFileSync(outputPath, cleanText, "utf-8");

    console.log("✅ IPC PDF text extracted successfully");
    console.log("📄 Output saved at rag-index/ipc-raw.txt");
  } catch (error) {
    console.error("❌ Error extracting IPC text:", error.message);
  }
}

extractIpcText();
