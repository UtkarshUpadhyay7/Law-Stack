const fs = require("fs");
const path = require("path");
const natural = require("natural");

const TfIdf = natural.TfIdf;

// Load IPC sections
const sectionsPath = path.join(__dirname, "../../rag-index/ipc-sections.json");
const sections = JSON.parse(fs.readFileSync(sectionsPath, "utf-8"));

const tfidf = new TfIdf();
const sectionKeys = Object.keys(sections);

// Build TF-IDF index
sectionKeys.forEach(key => {
  tfidf.addDocument(sections[key]);
});

/**
 * Hybrid IPC retrieval:
 * 1) Exact section number → strict return or explicit not-found
 * 2) Semantic search only if no section number provided
 */
function retrieveIpcSection(query, topK = 1) {
  const match = query.match(/\b(IPC|ipc)?\s*(section)?\s*(\d{1,3})\b/);
  const secNo = match ? match[3] : null;

  // 🔒 Strict handling: section mentioned but not indexed
  if (secNo && !sections[secNo]) {
    return [{
      section: secNo,
      score: 0,
      text: null,
      error: `Section ${secNo} not found in indexed IPC corpus`
    }];
  }

  // ✅ Exact section found
  if (secNo && sections[secNo]) {
    return [{
      section: secNo,
      score: 100,
      text: sections[secNo]
    }];
  }

  // 🔎 Semantic fallback (only if no section number)
  const scores = [];
  tfidf.tfidfs(query, (i, score) => {
    scores.push({
      section: sectionKeys[i],
      score,
      text: sections[sectionKeys[i]]
    });
  });

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, topK);
}

// ✅ EXPORT (THIS WAS THE ISSUE)
module.exports = {
  retrieveIpcSection
};
