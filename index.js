require('dotenv').config();  

const express = require("express");

const cors = require("cors");
const sentimentRoutes = require("./routes/sentiment");
const applicantRoutes = require("./routes/applicants");

// Load environment variables


const app = express();

// Enable CORS and JSON parsing *before* routes
app.use(cors());
app.use(express.json());

// Now mount your routes
app.use("/api", sentimentRoutes);
app.use("/api/applicants", applicantRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
