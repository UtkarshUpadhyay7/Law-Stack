const express = require("express");
const cors = require("cors");
require("dotenv").config();

const lawRoutes = require("./routes/lawRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/law", lawRoutes);

app.get("/", (req, res) => {
  res.send("🚀 LawLens Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
