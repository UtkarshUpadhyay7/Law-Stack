const express = require("express");
const cors = require("cors");
require("dotenv").config();

const lawRoutes = require("./routes/lawRoutes"); // ✅ ADD THIS

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/law", lawRoutes); // ✅ ADD THIS

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Law Lens Backend is Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
