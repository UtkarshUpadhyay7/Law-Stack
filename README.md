📚 LawStack — AI-Powered Legal Search Engine (RAG-Based)



LawStack is an AI-powered legal assistant designed to simplify Indian laws for common citizens using a Retrieval-Augmented Generation (RAG) architecture.

Instead of relying purely on AI, LawLens retrieves official legal texts and then explains them in simple, understandable language.



⚠️ Disclaimer: LawLens is for educational purposes only and does not provide legal advice.



🚀 Key Features
🔍 Search any IPC section (e.g., 302, 420, 314)
📄 Uses official Indian Penal Code (IPC) Bare Act
🧠 RAG-based architecture (no AI hallucination)
🤖 AI-powered explanation with safe fallback
🛡️ Honest responses when AI services are unavailable
⚙️ Scalable design (CrPC, IT Act can be added later)
🧠 Why RAG Instead of Plain AI?



Traditional AI models may hallucinate legal information, which is dangerous in legal contexts.
LawLens solves this by:
Retrieving the exact IPC section from official documents
Grounding the AI on retrieved text only
Explaining the law in simple terms

This ensures:
Accuracy
Transparency
Reliability



🏗️ Architecture Overview

User Query

&nbsp;  ↓

IPC Section Detection

&nbsp;  ↓

RAG Retrieval (TF-IDF)

&nbsp;  ↓

Official IPC Text

&nbsp;  ↓

AI Explanation (Optional)

&nbsp;  ↓

Safe Fallback if AI unavailable



📁 Project Structure

law-lens/

├── backend/

│   ├── src/

│   │   ├── controllers/

│   │   ├── routes/

│   │   ├── services/

│   │   │   ├── ipcRetriever.js

│   │   │   └── lawAIService.js

│   │   ├── rag/

│   │   │   ├── extractIpcText.js

│   │   │   ├── chunkIpcSections.js

│   │   │   └── testRetriever.js

│   │   └── server.js

│   ├── rag-data/        (ignored)

│   ├── rag-index/       (ignored)

│   └── package.json

├── frontend/

└── README.md



⚙️ Technologies Used
Node.js
Express.js
TF-IDF (natural library)
OpenAI API (with fallback)
PDF Parsing (pdf-parse)
JavaScript



🧪 Example Queries

What is IPC section 302?

Explain IPC 420

What punishment is given under IPC 314?



Sample Output (Fallback Mode)

302\. Punishment for murder.—Whoever commits murder shall be punished

with death or life imprisonment and fine.



Simple explanation:
This section explains the punishment for murder.
⚠️ This is not legal advice.

🛡️ AI Fallback Mechanism
If AI services are unavailable (quota/network issues):


LawLens still retrieves and displays official law text
Prevents system failure
Ensures uninterrupted access to legal information
This makes LawLens robust and reliable.



🎓 Final-Year Project Highlights
✔ Industry-grade RAG implementation
✔ Prevents AI hallucination
✔ Legal safety \& transparency
✔ Clean GitHub practices
✔ Easily extensible architecture

🔮 Future Scope

📘 Add Criminal Procedure Code (CrPC)
💻 Add IT Act \& Consumer Protection Act
☁️ Deploy on cloud
🔍 Add law comparison \& citations
🌐 Public web deployment



🧑‍🎓 Author
Utkarsh Upadhyay
Final Year Engineering Student
Project: LawLens



⚠️ Disclaimer
This project is intended for educational and academic purposes only.
It does not replace professional legal advice.



⭐ If You Like This Project
Give it a ⭐ on GitHub — it motivates future development!
