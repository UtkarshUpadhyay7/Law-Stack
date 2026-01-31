const { retrieveIpcSection } = require("../services/ipcRetriever");

const results = retrieveIpcSection("IPC section 302 murder punishment", 1);

console.log("🔍 Retrieval Result:");
console.log(results[0]);
