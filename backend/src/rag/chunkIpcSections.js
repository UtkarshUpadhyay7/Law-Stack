const fs = require("fs");
const path = require("path");

function chunkIpcSections() {
  const rawPath = path.join(__dirname, "../../rag-index/ipc-raw.txt");
  const outPath = path.join(__dirname, "../../rag-index/ipc-sections.json");

  const rawText = fs.readFileSync(rawPath, "utf-8");

  /**
   * Match section numbers like:
   * 302.—
   * 302.
   * Section 302.—
   * Works even without newlines
   */
  const sectionRegex = /(?:Section\s+)?(\d{1,3})\s*[.—-]/g;

  const sections = {};
  let match;
  let indices = [];

  // Find all section positions
  while ((match = sectionRegex.exec(rawText)) !== null) {
    indices.push({
      section: match[1],
      index: match.index
    });
  }

  // Build section chunks
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].index;
    const end = i + 1 < indices.length ? indices[i + 1].index : rawText.length;

    const secNo = indices[i].section;
    const text = rawText
      .slice(start, end)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);

    sections[secNo] = text;
  }

  fs.writeFileSync(outPath, JSON.stringify(sections, null, 2), "utf-8");

  console.log("✅ IPC sections chunked (robust, newline-independent)");
  console.log("📘 Total sections:", Object.keys(sections).length);
  console.log("📄 Saved to rag-index/ipc-sections.json");
}

chunkIpcSections();
