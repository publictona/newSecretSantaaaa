const express = require("express");
const { assignSecretSanta } = require("../utils/santaAssigner");
const Assignment = require("../routes/assignments");
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { year } = req.body;
    if (!year) {
      return res.status(400).json({ error: "Year is required!" });
    }

    console.log(`Generating Secret Santa assignments for ${year}...`);
    const assignments = await assignSecretSanta(year);

    res.status(200).json({ message: "Secret Santa assignments generated!", assignments });
  } catch (error) {
    console.error("🔥 Error in /generate:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});



module.exports = router;
